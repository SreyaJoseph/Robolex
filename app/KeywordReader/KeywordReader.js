"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function KeywordReader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const text = searchParams.get("extractedText") || "";

  const [keywords, setKeywords] = useState([]);
  const [activeWord, setActiveWord] = useState(null);

  useEffect(() => {
    if (!text) return;

    console.log("Extracted Text Received:", text);

    // Remove punctuation & split text into words
    // Also, convert the array to a Set to eliminate duplicates,
    // then back to an array.
    const words = Array.from(
      new Set(
        text
          .replace(/[^a-zA-Z\s]/g, "")
          .split(/\s+/)
          .filter((word) => word.length > 3)
      )
    );

    // Shuffle and then select up to 6 random words
    const shuffledWords = words.sort(() => 0.5 - Math.random());
    const selectedWords = shuffledWords.slice(0, 6);

    setKeywords(selectedWords);
  }, [text]);

  const speakWord = (word) => {
    // Cancel any ongoing speech before starting a new one.
    window.speechSynthesis.cancel();
    setActiveWord(word);

    // Create a SpeechSynthesisUtterance for the given word.
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    // For a clear voice, you can adjust the properties as needed.
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onend = () => setActiveWord(null);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button onClick={() => router.push("/SecondYear")} style={styles.backButton}>
        ← Back
      </button>

      <h2 style={styles.title}>Listen to Random Keywords!</h2>
      <div style={styles.grid}>
        {keywords.map((word, index) => (
          <button
            key={index}
            style={{
              ...styles.keyword,
              boxShadow:
                activeWord === word
                  ? "0px 0px 15px rgb(6, 13, 110)"
                  : "3px 3px 10px rgba(0,0,0,0.2)",
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
  container: {
    textAlign: "center",
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#f5faff",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#ff6f61",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#ff6f61",
    marginBottom: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr))",
    gap: "15px",
    marginTop: "20px",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    margin: "auto",
  },
  keyword: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0077b6",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "100px",
  },
};
