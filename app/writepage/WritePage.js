import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WritePage = () => {
  const navigate = useNavigate();
  const { letter } = useParams(); // Get letter from URL
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(`/letter/${letter}`)}>
        🔙 Back
      </button>
      <h1 style={styles.title}>Learn to Write Letter {letter.toUpperCase()}!</h1>
      
      {!videoVisible && (
        <button style={styles.button} onClick={() => setVideoVisible(true)}>
          Play Video
        </button>
      )}

      {videoVisible && (
        <div style={styles.videoWrapper}>
          <video style={styles.video} controls autoPlay>
            <source src={`/videos/Write${letter.toUpperCase()}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {videoVisible && (
        <button style={styles.doneButton} onClick={() => setVideoVisible(false)}>
          Done
        </button>
      )}
    </div>
  );
};

const styles = { 
  container: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#2C3E50", // Dark Blue-Grey Background
    color: "white",
    padding: "20px",
    overflow: "hidden",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#60a5fa", // blue-400
    color: "white",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "#FF6F61",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    outline: "none",
    marginBottom: "20px",
  },
  videoWrapper: {
    width: "50%",  // Adjusted video width for a smaller size
    maxWidth: "400px", // Prevents large expansion
    background: "#2C3E50",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  video: {
    width: "100%", // Makes the video responsive inside the wrapper
    borderRadius: "5px",
  },
  doneButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    outline: "none",
  },
};

export default WritePage;
