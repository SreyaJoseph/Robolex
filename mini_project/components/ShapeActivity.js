"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

const hiddenShapes = [
  { object: "Door", shape: "Rectangle", image: "/images/door.jpg" },
  { object: "Donut", shape: "Circle", image: "/images/donut.jpg" },
  { object: "Sign", shape: "Triangle", image: "/images/sign.jpg" },
  { object: "Board", shape: "Square", image: "/images/board.jpg" }
];

const shapeOptions = ["Circle", "Square", "Triangle", "Rectangle"];

const ShapeActivity = () => {
   const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentObject = hiddenShapes[currentIndex];

  const handleShapeSelection = (shape) => {
    if (shape === currentObject.shape) {
      setFeedback("🎉 Correct! Well done!");
      setTimeout(() => {
        if (currentIndex < hiddenShapes.length - 1) {
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
          <h2 style={styles.heading}>Find the Hidden Shape</h2>
          <p style={styles.instruction}>Which shape is hidden inside this object?</p>
          <img src={currentObject.image} alt={currentObject.object} style={styles.image} />
          <div style={styles.optionsContainer}>
            {shapeOptions.map((shape) => (
              <button
                key={shape}
                style={styles.shapeButton}
                onClick={() => handleShapeSelection(shape)}
              >
                {shape}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {feedback && !gameCompleted && (
        <div style={styles.robolexContainer}>
          <img src="/images/tortoise.png" alt="Robolex" style={styles.robolex} />
          <div style={styles.speechBubble}>{feedback}</div>
        </div>
      )}

      {gameCompleted && (
        <div style={styles.finalScreen}>
          <img src="/images/tortoise.png" alt="Robolex" style={styles.finalRobolex} />
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
    justifyContent: "center"
  },
  heading: { fontSize: "28px", fontWeight: "bold", color: "#333" },
  instruction: { fontSize: "20px", marginBottom: "10px" },
  image: { width: "200px", height: "200px", marginBottom: "20px" },
  optionsContainer: { display: "flex", gap: "15px", marginTop: "15px" },
  shapeButton: {
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
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

  robolexContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  robolex: {
    width: "150px",
    height: "150px"
  },
  speechBubble: {
    backgroundColor: "#fff",
    border: "2px solid #333",
    padding: "10px",
    borderRadius: "15px",
    fontSize: "18px",
    maxWidth: "250px",
    textAlign: "center",
    marginTop: "10px"
  },
  finalScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  finalRobolex: {
    width: "200px",
    height: "200px"
  },
  finalSpeechBubble: {
    backgroundColor: "#fff",
    border: "2px solid #333",
    padding: "15px",
    borderRadius: "15px",
    fontSize: "20px",
    maxWidth: "300px",
    textAlign: "center",
    marginTop: "15px"
  }
};

export default ShapeActivity;