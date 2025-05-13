"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";



const linesData = [
  { name: "Standing Line", image: "/images/standing-line.png", audio: "/sounds/standing-line.mp3" },
  { name: "Sleeping Line", image: "/images/sleeping-line.png", audio: "/sounds/sleeping-line.mp3" },
  { name: "Right Slanting Line", image: "/images/right-slanting-line.png", audio: "/sounds/right-slanting-line.mp3" },
  { name: "Left Slanting Line", image: "/images/left-slanting-line.jpg", audio: "/sounds/left-slanting-line.mp3" }
];

const lineOptions = ["Standing Line", "Sleeping Line", "Right Slanting Line", "Left Slanting Line"];

const LinesActivity = () => {
  const router = useRouter();  // ✅ Initialize Next.js Router
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio());
    }
  }, []);

  useEffect(() => {
    if (audio) {
      playAudio();
    }
  }, [audio, currentIndex]);

  const playAudio = () => {
    if (audio && linesData[currentIndex]) {
      audio.src = linesData[currentIndex].audio;
      audio.play();
    }
  };

  const handleSelection = (choice) => {
    if (choice === linesData[currentIndex].name) {
      setFeedback("🎉 Correct! Well done!");
      setTimeout(() => {
        if (currentIndex < linesData.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setFeedback("");
        } else {
          setGameCompleted(true);
          triggerCelebration();
        }
      }, 1000);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={styles.container}>
      {!gameCompleted ? (
        <>
          <h2 style={styles.heading}>Listen and Choose the Correct Line</h2>
          <p style={styles.instruction}>Which line is this?</p>
          <img src={linesData[currentIndex].image} alt={linesData[currentIndex].name} style={styles.image} />
          <button style={styles.audioButton} onClick={playAudio}>🔊 Play Again</button>
          <div style={styles.optionsContainer}>
            {lineOptions.map((option) => (
              <button
                key={option}
                style={styles.optionButton}
                onClick={() => handleSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {feedback && !gameCompleted && (
        <div style={styles.feedbackContainer}>
          <div style={styles.speechBubble}>{feedback}</div>
        </div>
      )}

      {gameCompleted && (
        <div style={styles.finalScreen}>
          <div style={styles.finalSpeechBubble}>🏆 Amazing! You've completed the activity! 🎉</div>
        </div>
      )}

      {/* ✅ Back Button to Redirect to first-year */}
      <button style={styles.backButton} onClick={() => router.push("/Lines")}>
        🔙 Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#f0f8ff",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: { fontSize: "28px", fontWeight: "bold", color: "#333" },
  instruction: { fontSize: "20px", marginBottom: "10px" },
  image: { width: "200px", height: "200px", marginBottom: "20px" },
  audioButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },

  // Corrected backButton styles
  backButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    padding: "10px 15px",
    backgroundColor: "#ed2939",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },

  optionsContainer: { display: "flex", gap: "15px", marginTop: "15px" },
  optionButton: {
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  feedbackContainer: {
    position: "fixed",
    bottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  speechBubble: {
    backgroundColor: "#fff",
    border: "2px solid #333",
    padding: "10px",
    borderRadius: "15px",
    fontSize: "18px",
    maxWidth: "250px",
    textAlign: "center",
    marginTop: "10px",
  },
  finalScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  finalSpeechBubble: {
    backgroundColor: "#fff",
    border: "2px solid #333",
    padding: "15px",
    borderRadius: "15px",
    fontSize: "20px",
    maxWidth: "300px",
    textAlign: "center",
    marginTop: "15px",
  },
};

export default LinesActivity;
