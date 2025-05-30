"use client"; // Ensure it's a client component

import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import Link from "next/link";
import { useRouter } from "next/navigation"; //  Import useRouter

const TextRecognition = () => {
  const [text, setText] = useState("");
  const [highlightedHTML, setHighlightedHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // Fixed reading speed; set to 0.9 for a comfortable pace.
  const fixedSpeed = 0.3;

  const speechRef = useRef(null);
  const router = useRouter(); //  Initialize router

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    setLoading(true);
    try {
      const { data: { text } } = await Tesseract.recognize(imageFile, "eng", {
        logger: (m) => console.log(m),
      });
      setText(text);
      // Initialize the highlighted content with original text.
      setHighlightedHTML(text);
      readTextAloud(text);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  // This function highlights the current word based on the character index.
  const highlightWordAtIndex = (fullText, charIndex) => {
    const wordRegex = /\S+/g;
    let match;
    while ((match = wordRegex.exec(fullText)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (charIndex >= start && charIndex < end) {
        const before = fullText.slice(0, start);
        const word = fullText.slice(start, end);
        const after = fullText.slice(end);
        // Using <mark> for highlighting; inline style ensures our custom color.
        const highlighted = `${before}<mark style="background-color: yellow; font-weight: bold;">${word}</mark>${after}`;
        setHighlightedHTML(highlighted);
        break;
      }
    }
  };

  const readTextAloud = (inputText) => {
    stopSpeech();
    if (!inputText.trim()) return;

    const speech = new SpeechSynthesisUtterance(inputText);
    speech.lang = "en-US";
    // Always use the fixed speed
    speech.rate = fixedSpeed;
    speech.pitch = 2; // A bit higher/pitched for warmth
    speech.volume = 5; // Default volume

    // Highlight words as the boundaries are reached.
    speech.onboundary = (event) => {
      if (event.name === "word") {
        highlightWordAtIndex(inputText, event.charIndex);
      }
    };

    speech.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      // Reset highlighting to the original text when finished.
      setHighlightedHTML(inputText);
    };

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
    // Reset the highlighted HTML to the original text.
    setHighlightedHTML(text);
  };

  return (
    <div style={styles.container}>
      <button onClick={() => router.back()} style={styles.backButton}>
        ⬅ Back
      </button>
      <h2 style={styles.title}>Scan & Enjoy!</h2>
      <p style={styles.subtitle}>
        Upload your text image and I'll happily read it aloud.
      </p>

      <label style={styles.fileUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        😊 Upload Image
      </label>

      {loading ? (
        <p style={styles.loading}>Please wait, processing your image...</p>
      ) : (
        text && (
          <div style={styles.textContainer}>
            {/* Preserve white space and original alignment using pre-wrap */}
            <div 
              style={styles.text}
              dangerouslySetInnerHTML={{ __html: highlightedHTML }} 
            />
            <div style={styles.buttonContainer}>
              <button onClick={pauseResumeSpeech} style={styles.button}>
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </button>
              <button onClick={stopSpeech} style={styles.button}>
                ⏹ Stop
              </button>
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
    textAlign: "left",
    whiteSpace: "pre-wrap",
    maxWidth: "600px",
    margin: "20px auto",
    border: "2px dashed #FF8C00",
    animation: "fadeIn 0.5s ease-in-out",
  },
  text: {
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "inherit",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
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
  backButton: {
    position: "fixed",
    top: "10px",
    left: "10px",
    padding: "10px 15px",
    backgroundColor: "#ed2939",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    zIndex: 1000,
  },
};

export default TextRecognition;
