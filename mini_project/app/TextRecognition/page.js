"use client"; // Ensure it's a client component

import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import Link from "next/link"; // ✅ Import Link from Next.js

const TextRecognition = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechRef = useRef(null);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    setLoading(true);
    try {
      const { data: { text } } = await Tesseract.recognize(imageFile, "eng", {
        logger: (m) => console.log(m),
      });
      setText(text);
      readTextAloud(text);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  const readTextAloud = (text) => {
    stopSpeech(); // Stop previous speech if any

    if (!text.trim()) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
    speechRef.current = speech;
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const pauseResumeSpeech = () => {
    if (!isSpeaking) return;

    if (isPaused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.pause();
    }
    setIsPaused(!isPaused);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Scan & Listen!</h2>
      <p style={styles.subtitle}>
        Upload an image of text, and I'll read it aloud for you!
      </p>

      <label style={styles.fileUpload}>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        📸 Upload Image
      </label>

      {loading ? (
        <p style={styles.loading}>🔄 Processing Image...</p>
      ) : (
        text && (
          <div style={styles.textContainer}>
            <p style={styles.text}>{text}</p>
            <div style={styles.buttonContainer}>
              <button onClick={pauseResumeSpeech} style={styles.button}>
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </button>
              <button onClick={stopSpeech} style={styles.button}>
                ⏹ Stop
              </button>

              {/* ✅ Correctly placed Link */}
              <Link href={`/KeywordReader?extractedText=${encodeURIComponent(text)}`} passHref>
                <button style={styles.button}>Proceed to Keywords</button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#FAF3E0",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    color: "#3b3b3b",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#FF6F61",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
    fontFamily: "'Baloo Bhai 2', cursive",
  },
  subtitle: {
    fontSize: "20px",
    fontFamily: "'Baloo Bhai 2', cursive",
    color: "#4a4a4a",
    marginBottom: "20px",
  },
  fileUpload: {
    display: "inline-block",
    padding: "12px 20px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#FF7F50",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "3px 3px 6px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },
  loading: {
    fontSize: "20px",
    color: "#0077b6",
    fontWeight: "bold",
    marginTop: "20px",
  },
  textContainer: {
    backgroundColor: "#FFF5E1",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "5px 5px 15px rgba(0,0,0,0.2)",
    marginTop: "20px",
    fontSize: "22px",
    lineHeight: "1.8",
    fontFamily: "'Comic Sans MS', 'Arial', sans-serif",
    color: "#333",
    textAlign: "center",
    maxWidth: "600px",
    margin: "20px auto",
    border: "2px dashed #FF8C00",
    animation: "fadeIn 0.5s ease-in-out",
  },
  text: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 18px",
    fontSize: "16px",
    backgroundColor: "#32CD32",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "3px 3px 8px rgba(0,0,0,0.2)",
  },
};

export default TextRecognition;
