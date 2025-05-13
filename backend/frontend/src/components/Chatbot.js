import { useState } from "react";
import "./Chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const userMessage = { sender: "user", text: userInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
  
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: updatedMessages.map(msg => `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`).join("\n") + "\nAI:",
        stream: false
      }),
    });
  
    const data = await response.json();
    const aiMessage = { sender: "bot", text: data.response };
    
    setMessages([...updatedMessages, aiMessage]);
    setUserInput("");
  };
  
  return (
    <div className="chat-container">
      <h2>Dyslexia Chatbot</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "user" ? "You: " : "Robolex: "}</strong>{msg.text}
          </p>
        ))}
      </div>
      <div className="input-container">
        <input 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Ask about dyslexia..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
