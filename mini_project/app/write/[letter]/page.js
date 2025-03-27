"use client"; // Enables client-side features

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function WritePage() {
  const { letter } = useParams();
  const router = useRouter();
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => router.push(`/letter/${letter}`)}>
        🔙 Back
      </button>
      <h1 style={styles.title}>Learn to Write Letter {letter.toUpperCase()}!</h1>
      
      {!videoVisible && (
        <button style={styles.button} onClick={() => setVideoVisible(true)}>
          ▶ Play Video
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
          ✅ Done
        </button>
      )}
    </div>
  );
}

const styles = { 
  container: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#2C3E50",
    color: "white",
    padding: "20px",
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
    marginBottom: "20px",
  },
  videoWrapper: {
    width: "50%",
    maxWidth: "400px",
    background: "#2C3E50",
    padding: "10px",
    borderRadius: "10px",
  },
  video: {
    width: "100%",
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
  },
};
