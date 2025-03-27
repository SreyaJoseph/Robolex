"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function KeywordReader() {
  const searchParams = useSearchParams();
  const text = searchParams.get("extractedText") || "";

  const [keywords, setKeywords] = useState([]);
  const [activeWord, setActiveWord] = useState(null);

  useEffect(() => {
    if (!text) return;

    console.log("Extracted Text Received:", text);

    // Remove punctuation & split text into words
    const words = text
      .replace(/[^a-zA-Z\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3); // Ignore short words

    // Select 5-6 random words
    const shuffledWords = words.sort(() => 0.5 - Math.random());
    const selectedWords = shuffledWords.slice(0, 6);

    setKeywords(selectedWords);
  }, [text]);

  const speakWord = (word) => {
    setActiveWord(word);
    
    // Read aloud
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    speech.onend = () => setActiveWord(null);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Listen to Random Keywords!</h2>
      <div style={styles.grid}>
        {keywords.map((word, index) => (
          <button
            key={index}
            style={{
              ...styles.keyword,
              boxShadow: activeWord === word ? "0px 0px 15px rgb(6, 13, 110)" : "3px 3px 10px rgba(0,0,0,0.2)",
              transform: activeWord === word ? "scale(1.1)" : "scale(1)",
            }}
            onClick={() => speakWord(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", minHeight: "100vh", padding: "40px", backgroundColor: "#f5faff" },
  title: { fontSize: "40px", fontWeight: "bold", color: "#ff6f61", marginBottom: "15px" },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr))", // Restrict width
    gap: "15px", // Reduce gap between buttons
    marginTop: "20px", 
    padding: "20px", // Reduced padding
    justifyContent: "center", // Center items in grid
    alignItems: "center", // Align items properly
    width: "fit-content", // Shrinks to fit content
    margin: "auto" // Centers grid on the page
  },
  keyword: { 
    fontSize: "30px",  // Further reduced font size
    fontWeight: "bold", 
    color: "#fff", 
    backgroundColor: "#0077b6", 
    padding: "8px 16px", // Further reduced padding
    borderRadius: "8px", // Adjusted border radius
    cursor: "pointer",
    minWidth: "100px", // Reduce minimum width
  },
};

