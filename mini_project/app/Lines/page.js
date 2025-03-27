"use client"; // ✅ Add this at the top

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import LineActivity from "../../components/LineActivity";
import ShapeActivity from "../../components/ShapeActivity";

const Lines = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter(); 

  const videos = {
    Lines: "/videos/Line1.mp4",
    Shapes: "/videos/Line2.mp4",
    Examples: "/videos/Line3.mp4",
  };

  const activityRoutes = {
    Lines: "/LineActivity",
    Shapes: "/ShapeActivity",
    Examples: "/ShapeActivity",
  };
  

  const handleVideoChange = (option) => {
    if (selectedVideo !== option) {
      setSelectedVideo(option);
      setVideoCompleted(false);
      setShowConfetti(false);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onended = () => {
        setVideoCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Confetti appears for 3 seconds
      };
    }
  }, [selectedVideo]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Let's Learn Lines and Shapes!</h1>
      
      <div style={styles.buttonContainer}>
        {Object.keys(videos).map((option) => (
          <button
            key={option}
            style={styles.button}
            onClick={() => handleVideoChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedVideo && (
        <div style={styles.videoWrapper}>
          <video ref={videoRef} style={styles.video} controls autoPlay>
            <source src={videos[selectedVideo]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {videoCompleted && <h2 style={styles.completedText}>Completed!</h2>}
        </div>
      )}

{videoCompleted && selectedVideo && (
  <>
    <button style={styles.continueButton} onClick={() => router.push(activityRoutes[selectedVideo])}> 
      Continue to Activity
    </button>
    <button style={styles.backButton} onClick={() => router.push("/first-year")}>
      🔙 Back 
    </button>
  </>
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
    height: "100%",
    width: "100%",
    backgroundColor: "#2C3E50",
    color: "white",
    padding: "20px",
    overflow: "auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#FF6F61",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    outline: "none",
  },
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
  videoWrapper: {
    width: "50%",
    maxWidth: "400px",
    background: "#2C3E50",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    marginBottom: "20px",
  },
  video: {
    width: "100%",
    borderRadius: "5px",
  },
  completedText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: "10px",
  },
  continueButton: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    outline: "none",
    marginTop: "20px",
  },
};

export default Lines;

