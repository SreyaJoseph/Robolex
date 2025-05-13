'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AlphabetGrid = () => {
  const router = useRouter(); 
  useEffect(() => {
    // Ensure CSS is added dynamically if needed
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes bgAnimation {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button 
        onClick={() => router.push("/Words")} 
        style={styles.backButton}
      >
        ⬅ Back
      </button>
      <h1 style={styles.heading}>Choose an Alphabet!</h1>
      <div style={styles.grid}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <Link href={`/AlphabetImageMapping/${letter}`} key={letter} style={styles.card}>
            {letter}
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb)",
    animation: "bgAnimation 8s infinite alternate ease-in-out",
    backgroundSize: "200% 200%",
  },
  backButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    position: "absolute",
    top: "20px",
    left: "20px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
    gap: "15px",
    maxWidth: "600px",
    margin: "auto",
  },
  card: {
    backgroundColor: "#ff6b6b",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

export default AlphabetGrid;
