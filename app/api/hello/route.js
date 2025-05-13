import connectToDatabase from "@/lib/mongodb"; // ✅ Default import

export async function GET() {
  try {
    const db = await connectToDatabase();
    return new Response(JSON.stringify({ message: "Connected to DB!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database connection failed" }), { status: 500 });
  }
}
