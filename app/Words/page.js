"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Words = () => {
  const router = useRouter();

  // ✅ Random redirect function
  const handleRandomPopTheBubble = () => {
    const editions = ["fruit", "animal"];
    const randomEdition = editions[Math.floor(Math.random() * editions.length)];
    router.push(`/PopTheBubble/${randomEdition}`);
  };

  return (
    <div style={styles.container}>
      {/* 🔙 Back Button */}
      <Link href="/first-year" style={styles.backButton}>
        <ArrowLeft style={{ width: "24px", height: "24px" }} />
        <span>Home</span>
      </Link>

      <h1 style={styles.title}>Let's Learn Words NOW!</h1>
      <p style={styles.subtitle}>Choose a Game to Learn</p>

      <div style={styles.grid}>
        {/* 1️⃣ Alphabet-Image Mapping */}
        <button
          style={styles.card}
          onClick={() => router.push("/GridMap")}
        >
          Alphabet-Image Mapping
        </button>

        {/* 2️⃣ Pop the First */}
        <Link href="/pop-the-first" style={styles.card}>
          <span> Pop The First </span>
        </Link>

        {/* 3️⃣ Pop The Bubble (Randomly redirects) */}
        <button onClick={handleRandomPopTheBubble} style={styles.card}>
          <span> Pop The Bubble </span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#1e2a3a",
    maxWidth: "100%",
    minHeight: "100vh",
    padding: "0px",
    color: "white",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    color: "#60a5fa",
    textDecoration: "none",
    position: "absolute",
    top: "20px",
    left: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "40px",
    marginBottom: "10px",
    color: "#fff",
    textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",       // more space between buttons
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff9800",
    padding: "20px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "white",
    fontSize: "22px", // slightly bigger text
    fontWeight: "bold",
    transition: "0.3s",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    width: "320px",    // increased width
    height: "80px",    // increased height
  },
};

export default Words;
