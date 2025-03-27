"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./PopTheFirst.module.css";

// ✅ Updated image paths to match public/assets folder
const images = [
  { src: "/Assets/apple.jpg", label: "Apple" },
  { src: "/Assets/banana.jpg", label: "Banana" },
  { src: "/Assets/cat.png", label: "Cat" },
  { src: "/Assets/dog.jpg", label: "Dog" }
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

const PopTheFirst = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(getRandomImage());
  const [bubbles, setBubbles] = useState([]);
  const [poppedBubble, setPoppedBubble] = useState(null);

  useEffect(() => {
    console.log("Selected Image Path:", selectedImage.src); // Debugging log
    generateBubbles(selectedImage.label[0].toUpperCase());
  }, [selectedImage]);

  const generateBubbles = (correctLetter) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const randomLetters = new Set([correctLetter]);

    while (randomLetters.size < 5) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      randomLetters.add(randomLetter);
    }

    setBubbles(Array.from(randomLetters).sort(() => Math.random() - 0.5));
  };

  const handleBubbleClick = (letter, index) => {
    if (letter === selectedImage.label[0].toUpperCase()) {
      setPoppedBubble(index);
      setTimeout(() => {
        setPoppedBubble(null);
        setSelectedImage(getRandomImage());
      }, 2000);
    }
  };

  return (
    <div className={styles.gameContainer}>
      {/* ✅ Back Button */}
      <button className={styles.backButton} onClick={() => router.push("/Words")}>
        🔙 Back
      </button>

      <h1 className={styles.title}>Pop the First!</h1>
      <h2 className={styles.subtitle}>Pop the bubble with the first letter of the picture</h2>

      <div className={styles.imageContainer}>
        <img src={selectedImage.src} alt={selectedImage.label} className={styles.image} />
      </div>

      <div className={styles.bubbleContainer}>
        {bubbles.map((letter, index) => (
          <div
            key={index}
            className={`${styles.bubble} ${poppedBubble === index ? styles.pop : ""}`}
            onClick={() => handleBubbleClick(letter, index)}
          >
            {letter}
            {poppedBubble === index && (
              <div className={styles.moistureBubbles}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.smallBubble}></span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopTheFirst;
