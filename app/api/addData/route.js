import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase"); 
    const collection = db.collection("users"); 

    const data = await req.json(); // Extract data from request
    const result = await collection.insertOne(data);

    return new Response(
      JSON.stringify({ message: "Data inserted successfully", result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database insert failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
