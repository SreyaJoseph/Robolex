"use client";
import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ReadingPage = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPronunciationCorrect, setIsPronunciationCorrect] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const words = text.split(" ");
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  let utterance = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = handleSpeechRecognition;
    recognition.onerror = (event) => console.error("Speech recognition error", event);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSpeechRecognition = (e) => {
    if (e.results && e.results[0] && e.results[0][0]) {
      const spokenWord = e.results[0][0].transcript.trim().toLowerCase();
      const targetWord = words[currentWordIndex].toLowerCase();

      if (spokenWord === targetWord) {
        setIsPronunciationCorrect(true);
        handleNextWord();
      } else {
        setIsPronunciationCorrect(false);
      }
    }
  };

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      alert("Congratulations! You've finished reading.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        const extractedText = "This is a sample text for reading practice.";
        setText(extractedText);
        setCurrentWordIndex(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const readText = () => {
    if (!text) return;
    utterance.current = new SpeechSynthesisUtterance(text);
    utterance.current.lang = "en-US";
    speechSynthesisRef.current.speak(utterance.current);
    setIsReading(true);
  };

  const pauseReading = () => {
    speechSynthesisRef.current.pause();
    setIsReading(false);
  };

  const resumeReading = () => {
    speechSynthesisRef.current.resume();
    setIsReading(true);
  };

  const restartReading = () => {
    setCurrentWordIndex(0);
    setIsPronunciationCorrect(true);
    speechSynthesisRef.current.cancel();
    setIsReading(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}><h1 style={styles.title}>Reading Practice</h1></header>
      <section style={styles.uploadSection}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </section>
      <section style={styles.textSection}>
        <h2 style={styles.textTitle}>Text to Read:</h2>
        <div style={styles.textContainer}>
          {words.map((word, index) => (
            <span
              key={index}
              style={{
                backgroundColor: index === currentWordIndex ? "#facc15" : "transparent",
                color: "black",
                fontWeight: "bold",
                fontSize: "22px",
                fontFamily: "OpenDyslexic, Arial, sans-serif",
                marginRight: "5px",
                padding: "2px",
                transition: "background-color 0.3s",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </section>
      <section style={styles.controls}>
        <button onClick={startRecognition} style={styles.button}>Guide Me</button>
        <button onClick={readText} style={styles.button}>Read to Me</button>
        <button onClick={pauseReading} style={styles.button} disabled={!isReading}>Pause</button>
        <button onClick={resumeReading} style={styles.button} disabled={isReading}>Resume</button>
        <button onClick={restartReading} style={styles.button}>Restart</button>
        <p style={styles.feedback}>{isPronunciationCorrect ? "Correct Pronunciation!" : "Incorrect Pronunciation!"}</p>
      </section>
      <footer style={styles.footer}><p>&copy; 2025 Robolex. Making learning easier for kids.</p></footer>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f4f6", color: "black" },
  header: { display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backgroundColor: "#1e40af" },
  title: { fontSize: "32px", fontWeight: "bold", color: "white" },
  uploadSection: { textAlign: "center", padding: "20px" },
  textSection: { textAlign: "center", padding: "20px" },
  textTitle: { fontSize: "24px", color: "#374151" },
  textContainer: { fontSize: "24px", marginTop: "10px" },
  controls: { textAlign: "center", padding: "20px" },
  button: { margin: "5px", padding: "10px 20px", backgroundColor: "#facc15", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" },
  feedback: { marginTop: "10px", fontSize: "18px", fontWeight: "600" },
  footer: { marginTop: "auto", padding: "16px", backgroundColor: "#1e40af", textAlign: "center", color: "white" },
};

export default ReadingPage;
