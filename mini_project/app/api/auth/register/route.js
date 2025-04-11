import clientPromise from "../../../../src/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("⚠️ Missing JWT_SECRET in environment variables");
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Validate name: only letters and spaces allowed
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return NextResponse.json(
        { error: "Invalid name format." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mydatabase");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    // Password strength check: at least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name: name.trim(),
      email: sanitizedEmail,
      password: hashedPassword,
    });

    console.log("🆕 New user ID:", result.insertedId);

    const token = jwt.sign(
      { userId: result.insertedId, email: sanitizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
