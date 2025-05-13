"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Chatbot.css";

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm here to help answer your questions regarding dyslexia. How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = userInput;
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });
      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again later." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Parent Support Chatbot</h2>
        <button
          onClick={() => router.push("/main-menu")}
          className="bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm hover:bg-indigo-600 transition"
        >
          Back to Main Menu
        </button>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="chat-bubble">
              <strong>{msg.sender === "user" ? "You" : "Robolex"}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
