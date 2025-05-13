"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import confetti from "canvas-confetti";
import words from "../WordAssessment/words";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const WordAssessment = () => {
  const router = useRouter(); // Initialize router
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [droppedLetter, setDroppedLetter] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [totalStars, setTotalStars] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  
  useEffect(() => {
    setStartTime(Date.now());
    setAttempts(0);
    setShuffledOptions(shuffleArray([...words[currentWordIndex].options]));
  }, [currentWordIndex]);

  const calculateStars = () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    if (attempts === 0 && timeTaken <= 5) return 3;
    if (attempts <= 1 && timeTaken <= 10) return 2;
    return 1;
  };

  const handleDrop = (letter) => {
    setAttempts(attempts + 1);
    if (letter === words[currentWordIndex].missing) {
      const earnedStars = calculateStars();
      setDroppedLetter(letter);
      setFeedback(`🎉 Correct! You earned ${earnedStars}⭐!`);
      setTotalStars((prev) => prev + earnedStars);
      confetti();
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setDroppedLetter(null);
          setFeedback("");
        } else {
          setShowFinalScreen(true);
          confetti({ particleCount: 300, spread: 120 });
        }
      }, 1500);
    } else {
      setFeedback("❌ Try again!");
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  const handleBack = () => {
    router.back(); // Navigates to the previous page
  };

  return (
    <div style={styles.container}>
      {showFinalScreen ? (
        <div style={styles.finalScreen}>
          <img src="/tortoise.png" alt="Robolex" style={styles.robolexLarge} />
          <div style={styles.speechBubbleFinal}>
            🎊 Amazing! You earned a total of {totalStars} ⭐! 🎊
          </div>
          <button onClick={handleBack} style={styles.backButton}>⬅ Back</button>
        </div>
      ) : (
        <>
          <button onClick={handleBack} style={styles.backButton}>⬅ Back</button>
          <h2 style={styles.title}>Complete the Word</h2>

          <img src={words[currentWordIndex].image} alt={words[currentWordIndex].word} style={styles.image} />
          <p style={styles.word}>
            <span
              style={droppedLetter ? styles.correctBlank : styles.blank}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e.dataTransfer.getData("text"))}
            >
              {droppedLetter || "_"}
            </span>
            {words[currentWordIndex].word.slice(1)}
          </p>
          <div style={styles.options}>
            {shuffledOptions.map((letter) => (
              <div
                key={letter}
                style={styles.letter}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text", letter)}
              >
                {letter}
              </div>
            ))}
          </div>
          {feedback && (
            <div style={styles.robolexContainer}>
              <img src="/tortoise.png" alt="Robolex" style={styles.robolex} />
              <div style={styles.speechBubble}>{feedback}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#367588",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
    title: {
      fontSize: "40px", // Increase the font size
      fontWeight: "bold",
      color: "black",
      marginBottom: "90px",
    },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#69359c ",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  image: {
    width: "150px",
    height: "150px",
    marginBottom: "20px"
  },
  word: {
    fontSize: "40px",
    fontWeight: "bold",
    letterSpacing: "3px"
  },
  blank: {
    display: "inline-block",
    width: "50px",
    height: "50px",
    fontSize: "30px",
    textAlign: "center",
    border: "2px dashed #555",
    backgroundColor: "#fff",
    margin: "0 5px"
  },
  correctBlank: {
    display: "inline-block",
    width: "50px",
    height: "50px",
    fontSize: "30px",
    textAlign: "center",
    border: "2px solid #28A745",
    backgroundColor: "#D4EDDA",
    margin: "0 5px"
  },
  options: {
    display: "flex",
    gap: "15px",
    marginTop: "20px"
  },
  letter: {
    fontSize: "22px",
    padding: "15px",
    background: "#FFD700",
    borderRadius: "8px",
    cursor: "grab",
    textAlign: "center",
    width: "50px",
    fontWeight: "bold"
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
    width: "100px",
    height: "100px"
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
    alignItems: "center"
  },
  robolexLarge: {
    width: "150px",
    height: "150px"
  },
  speechBubbleFinal: {
    backgroundColor: "#fff",
    border: "3px solid #333",
    padding: "15px",
    borderRadius: "20px",
    fontSize: "20px",
    maxWidth: "300px",
    textAlign: "center",
    marginTop: "15px"
  }
};

export default WordAssessment;
