import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LetterPage() {
  const { letter } = useParams();
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState("");

  // Dynamically check for PNG or JPG
  useEffect(() => {
    const pngPath = `/images/${letter.toLowerCase()}1.png`;
    const jpgPath = `/images/${letter.toLowerCase()}1.jpg`;

    const img = new Image();
    img.src = pngPath;
    img.onload = () => setImagePath(pngPath); // If PNG loads, use it
    img.onerror = () => setImagePath(jpgPath); // If PNG fails, try JPG
  }, [letter]);

  const soundPath = `/sounds/sound${letter.toUpperCase()}.mp3`;

  // Function to play the sound
  const playSound = () => {
    new Audio(soundPath).play();
  };

  return (
    <div style={styles.container}>
      {/* 🔙 Back Button */}
      <button style={styles.backButton} onClick={() => navigate("/AlphabetGrid")}>
        🔙 Back
      </button>

      <h1 style={styles.title}>Hey, I am {letter.toUpperCase()}!</h1>

      {/* Letter Image with Sound Support */}
      <div
        style={styles.imageContainer}
        onClick={playSound}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {imagePath && <img src={imagePath} alt={`Letter ${letter}`} style={styles.image} />}
      </div>

      <p style={styles.instruction}>Tap me to hear how I sound!</p>

      {/* Learn to Write Button */}
      <button style={styles.learnButton} onClick={() => navigate(`/write/${letter}`)}>
        ✍️ Learn to Write
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#111827",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#60a5fa",
    color: "white",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "white",
    marginBottom: "20px",
  },
  imageContainer: {
    width: "250px",
    height: "250px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  instruction: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
  },
  learnButton: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#60a5fa",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background 0.3s",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
  },
};

export default LetterPage;
