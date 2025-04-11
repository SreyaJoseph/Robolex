import clientPromise from "../../../../src/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("⚠️ Missing JWT_SECRET in environment variables");
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email: sanitizedEmail });
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password for this email." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: sanitizedEmail },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json(
      {
        message: "Login successful!",
        user: { name: user.name, email: user.email },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
