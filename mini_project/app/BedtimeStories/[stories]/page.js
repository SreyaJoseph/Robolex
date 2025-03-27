"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStory } from "../../context"; // Adjust import path if necessary

const storyData = {
  "bear-and-bee": { title: "The Bear and The Bee", src: "/Assets/video/bed1.mp4" },
  "red-hen": { title: "The Little Red Hen", src: "/Assets/video/bed2.mp4" },
  "oak-tree": { title: "The Oak Tree", src: "/Assets/video/bed3.mp4" },
};


const BedtimeStories = () => {
  let selectedStory;
  const router = useRouter();

  try {
    const storyContext = useStory();
    selectedStory = storyContext?.selectedStory;
  } catch (error) {
    console.warn("useStory is not available:", error);
  }

  const params = useParams();
  console.log("Params Object:", params); // Debugging line
  const storyId = params?.stories ?? selectedStory; // Fixed parameter name
  console.log("Story ID:", storyId); // Debugging line

  useEffect(() => {
    if (typeof window !== "undefined") {
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const story = storyData[storyId];
  console.log("Story Data:", story); // Debugging line

  return (
    <div style={styles.container}>
      {/* ✅ Back Button */}
      <button onClick={() => router.push("/BedtimeStories")} style={styles.backButton}>
        ⬅ Back
      </button>

      <h1 style={styles.title}>{story ? story.title : "Story Not Found"}</h1>

      {story ? (
        <div style={styles.videoWrapper}>
          {/* Video Element */}
          <video style={styles.video} controls autoPlay muted>
            <source src={story.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p style={styles.error}>Oops! This story isn't available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#1E3A5F",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "relative",
  },
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
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    textTransform: "capitalize",
    textShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
  },
  videoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
  },
  video: {
    width: "80%",
    maxWidth: "600px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.3)",
  },
  error: {
    fontSize: "22px",
    color: "#FFCC00",
    marginTop: "20px",
  },
};

export default BedtimeStories;
