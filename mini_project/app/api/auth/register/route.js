import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const usersCollection = db.collection("users");

    const { name, email, password } = await req.json();

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    return new Response(
      JSON.stringify({ message: "User registered successfully!", userId: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
