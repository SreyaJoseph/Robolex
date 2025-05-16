"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

const stories = [
  { title: "The Bear and The Bee", path: "/BedtimeStories/bear-and-bee" },
  { title: "The Little Red Hen", path: "/BedtimeStories/red-hen" },
  { title: "The Oak Tree", path: "/BedtimeStories/oak-tree" },
];

const BedtimeStoryGrid = () => {
  const router = useRouter(); //  Initialize useRouter

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Choose a Magical Bedtime Story!</h1>

      {/*  Corrected Back Button */}
      <button onClick={() => router.push("/SecondYear")} style={styles.backButton}>
        ⬅ Back
      </button>

      <div style={styles.grid}>
        {stories.map((story) => (
          <Link href={story.path} key={story.title} passHref>
            <div style={styles.card}>{story.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "40px 20px", minHeight: "100vh", backgroundColor: "#1E3A5F" },
  heading: { fontSize: "36px", fontWeight: "bold", marginBottom: "50px", color: "white" },
  grid: { display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1E3A5F",
    backgroundColor: "#FFCC00",
    border: "2px solid white",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.2)",
  },
  card: {
    backgroundColor: "#FFD700",
    padding: "15px 40px",
    borderRadius: "12px",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "300px",
  },
};

export default BedtimeStoryGrid;
