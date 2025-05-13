import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { message } = await req.json();

        // Call Ollama API
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistral', // Change if using another model
                prompt: message,
            }),
        });

        const data = await response.json();
        return NextResponse.json({ reply: data.response });
    } catch (error) {
        return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Chatbot API is running" });
}
