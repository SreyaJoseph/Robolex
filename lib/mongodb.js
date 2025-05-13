// pages/api/your-api.js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const data = await db.collection("users").find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("MongoDB API Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
