// app/api/chat/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Build a prompt that instructs the AI to answer questions supportively
    const prompt = `You are a supportive and knowledgeable assistant for parents of dyslexic students. 
Answer the following question in a clear, empathetic, and informative manner:
    
Parent's Question: ${message}
    
Assistant:`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    return NextResponse.json({ reply: data.response });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}
