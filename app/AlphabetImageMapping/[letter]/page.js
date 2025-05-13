"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const images = {
  A: [
    { src: "apple.jpg", label: "Apple", sound: "apple.mp3" },
    { src: "ant.jpg", label: "Ant", sound: "ant.mp3" },
    { src: "arm.jpg", label: "Arm", sound: "arm.mp3" },
    { src: "airplane.jpg", label: "Airplane", sound: "airplane.mp3" },
  ],
B: [
      { src: "ball.jpg", label: "Ball", sound: "ball.mp3" },
      { src: "banana.jpg", label: "Banana", sound: "banana.mp3" },
      { src: "butterfly.jpg", label: "Butterfly", sound: "butterfly.mp3" },
      { src: "boat.jpg", label: "Boat", sound: "boat.mp3" },
    ],
    C: [
      { src: "cat.png", label: "Cat", sound: "cat.mp3" },
      { src: "car.jpg", label: "Car", sound: "car.mp3" },
      { src: "cake.jpg", label: "Cake", sound: "cake.mp3" },
      { src: "camel.jpg", label: "Camel", sound: "camel.mp3" },
    ],
    D: [
      { src: "dog.jpg", label: "Dog", sound: "dog.mp3" },
      { src: "doll.jpg", label: "Doll", sound: "doll.mp3" },
      { src: "duck.webp", label: "Duck", sound: "duck.mp3" },
      { src: "drum.jpg", label: "Drum", sound: "drum.mp3" },
    ],
    E: [
      { src: "elephant.jpg", label: "Elephant", sound: "elephant.mp3" },
      { src: "egg.jpg", label: "Egg", sound: "egg.mp3" },
      { src: "ear.png", label: "Ear", sound: "ear.mp3" },
      { src: "eagle.jpg", label: "Eagle", sound: "eagle.mp3" },
    ],
    F: [
      { src: "fish.jpg", label: "Fish", sound: "fish.mp3" },
      { src: "frog.jpg", label: "Frog", sound: "frog.mp3" },
      { src: "flower.jpg", label: "Flower", sound: "flower.mp3" },
      { src: "fan.jpg", label: "Fan", sound: "fan.mp3" },
    ],
    G: [
      { src: "goat.jpg", label: "Goat", sound: "goat.mp3" },
      { src: "grapes.jpg", label: "Grapes", sound: "grapes.mp3" },
      { src: "gift.jpg", label: "Gift", sound: "gift.mp3" },
      { src: "guitar.jpg", label: "Guitar", sound: "guitar.mp3" },
    ],
    H: [
      { src: "horse.jpg", label: "Horse", sound: "horse.mp3" },
      { src: "hat.jpg", label: "Hat", sound: "hat.mp3" },
      { src: "house.jpg", label: "House", sound: "house.mp3" },
      { src: "helicopter.jpg", label: "Helicopter", sound: "helicopter.mp3" },
    ],
    I: [
      { src: "icecream.jpg", label: "Ice Cream", sound: "icecream.mp3" },
      { src: "igloo.jpg", label: "Igloo", sound: "igloo.mp3" },
      { src: "ice.jpg", label: "Ice", sound: "ice.mp3" },
      { src: "iron.jpg", label: "Iron", sound: "iron.mp3" },
    ],
    J: [
      { src: "jug.jpg", label: "Jug", sound: "jug.mp3" },
      { src: "jellyfish.jpg", label: "Jellyfish", sound: "jellyfish.mp3" },
      { src: "jacket.jpg", label: "Jacket", sound: "jacket.mp3" },
      { src: "jeep.jpg", label: "Jeep", sound: "jeep.mp3" },
    ],
    K: [
      { src: "kite.jpg", label: "Kite", sound: "kite.mp3" },
      { src: "koala.jpg", label: "Koala", sound: "koala.mp3" },
      { src: "key.jpg", label: "Key", sound: "key.mp3" },
      { src: "kangaroo.jpg", label: "Kangaroo", sound: "kangaroo.mp3" },
    ],
    L: [
      { src: "lion.jpg", label: "Lion", sound: "lion.mp3" },
      { src: "lamp.avif", label: "Lamp", sound: "lamp.mp3" },
      { src: "leaf.jpg", label: "Leaf", sound: "leaf.mp3" },
      { src: "ladder.jpg", label: "Ladder", sound: "ladder.mp3" },
    ],
    M: [
      { src: "monkey.jpg", label: "Monkey", sound: "monkey.mp3" },
      { src: "moon.jpg", label: "Moon", sound: "moon.mp3" },
      { src: "mango.jpg", label: "Mango", sound: "mango.mp3" },
      { src: "milk.jpg", label: "Milk", sound: "milk.mp3" },
    ],
    N: [
      { src: "nest.jpg", label: "Nest", sound: "nest.mp3" },
      { src: "notebook.jpg", label: "Notebook", sound: "notebook.mp3" },
      { src: "nose.jpg", label: "Nose", sound: "nose.mp3" },
      { src: "net.jpg", label: "Net", sound: "net.mp3" },
    ],
    O: [
      { src: "orange.jpg", label: "Orange", sound: "orange.mp3" },
      { src: "owl.jpg", label: "Owl", sound: "owl.mp3" },
      { src: "octopus.jpg", label: "Octopus", sound: "octopus.mp3" },
      { src: "onion.jpg", label: "Onion", sound: "onion.mp3" },
    ],
    P: [
      { src: "parrot.jpg", label: "Parrot", sound: "parrot.mp3" },
      { src: "peacock.jpg", label: "Peacock", sound: "peacock.mp3" },
      { src: "pumpkin.jpg", label: "Pumpkin", sound: "pumpkin.mp3" },
      { src: "pencil.jpg", label: "Pencil", sound: "pencil.mp3" },
    ],
    Q: [
      { src: "queen.jpg", label: "Queen", sound: "queen.mp3" },
      { src: "quail.jpg", label: "Quail", sound: "quail.mp3" },
      { src: "question.jpg", label: "Question", sound: "question.mp3" },
      { src: "quill.jpg", label: "Quill", sound: "quill.mp3" },
    ],
    R: [
      { src: "rabbit.jpg", label: "Rabbit", sound: "rabbit.mp3" },
      { src: "rainbow.jpg", label: "Rainbow", sound: "rainbow.mp3" },
      { src: "ring.jpg", label: "Ring", sound: "ring.mp3" },
      { src: "rocket.jpg", label: "Rocket", sound: "rocket.mp3" },
    ],
    S: [
      { src: "sun.jpg", label: "Sun", sound: "sun.mp3" },
      { src: "star.jpg", label: "Star", sound: "star.mp3" },
      { src: "ship.jpg", label: "Ship", sound: "ship.mp3" },
      { src: "strawberry.jpg", label: "Strawberry", sound: "strawberry.mp3" },
    ],
    T: [
      { src: "tiger.jpg", label: "Tiger", sound: "tiger.mp3" },
      { src: "turtle.jpg", label: "Turtle", sound: "turtle.mp3" },
      { src: "tree.jpg", label: "Tree", sound: "tree.mp3" },
      { src: "train.jpg", label: "Train", sound: "train.mp3" },
    ],
    U: [
      { src: "umbrella.jpg", label: "Umbrella", sound: "umbrella.mp3" },
      { src: "unicorn.jpg", label: "Unicorn", sound: "unicorn.mp3" },
      { src: "utensil.jpg", label: "Utensil", sound: "utensil.mp3" },
      { src: "ukulele.jpg", label: "Ukulele", sound: "ukulele.mp3" },
    ],
    V: [
      { src: "van.jpg", label: "Van", sound: "van.mp3" },
      { src: "vase.jpg", label: "Vase", sound: "vase.mp3" },
      { src: "violin.jpg", label: "Violin", sound: "violin.mp3" },
      { src: "vulture.jpg", label: "Vulture", sound: "vulture.mp3" },
    ],
    W: [
      { src: "whale.jpg", label: "Whale", sound: "whale.mp3" },
      { src: "watch.jpg", label: "Watch", sound: "watch.mp3" },
      { src: "watermelon.jpg", label: "Watermelon", sound: "watermelon.mp3" },
      { src: "wood.jpg", label: "Wood", sound: "wood.mp3" },
    ],
    X: [
      { src: "xylophone.jpg", label: "Xylophone", sound: "xylophone.mp3" },
      { src: "xray.jpg", label: "X-Ray", sound: "xray.mp3" },
      { src: "xmas.jpg", label: "X-mas Tree", sound: "xmas.mp3" },
      { src: "xenops.jpg", label: "Xenops", sound: "xenops.mp3" },
    ],
    Y: [
      { src: "yak.jpg", label: "Yak", sound: "yak.mp3" },
      { src: "yacht.jpg", label: "Yacht", sound: "yacht.mp3" },
      { src: "yo-yo.jpg", label: "Yo-Yo", sound: "yo-yo.mp3" },
      { src: "yogurt.jpg", label: "Yogurt", sound: "yogurt.mp3" },
    ],
    Z: [
      { src: "zebra.jpg", label: "Zebra", sound: "zebra.mp3" },
      { src: "zip.jpg", label: "Zip", sound: "zip.mp3" },
      { src: "zigzag.jpg", label: "Zigzag", sound: "zigzag.mp3" },
      { src: "zero.jpg", label: "Zero", sound: "zero.mp3" },
    ],


};

const AlphabetImageMapping = () => {
  const params = useParams();
  const router = useRouter(); // ✅ Initialize router
  const { letter } = useParams();
  const selectedLetter = letter?.toUpperCase() || "A"; // Directly derive letter from URL

  const letterImages = images[selectedLetter] || [];

  const playSound = (soundFile) => {
    const audio = new Audio(`/Assets/sounds/${soundFile}`);
    audio.play();
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button 
        onClick={() => router.push("/GridMap")} 
        style={styles.backButton}
      >
        ⬅ Back
      </button>
      <motion.h1 
        style={styles.heading} 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Letter: {selectedLetter}
      </motion.h1>

      <div style={styles.contentContainer}>
        <motion.div 
          style={styles.letterContainer}
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 style={styles.letter}>{selectedLetter}</h1>
        </motion.div>

        <div style={styles.imageContainer}>
          {letterImages.length > 0 ? (
            letterImages.map((img, index) => (
              <motion.div
                key={index}
                style={styles.imageWrapper}
                onClick={() => playSound(img.sound)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img src={`/Assets/${img.src}`} alt={img.label} style={styles.image} />
                <p style={styles.imageLabel}>{img.label}</p>
              </motion.div>
            ))
          ) : (
            <p style={styles.noImageText}>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(to right, #1A2980, #26D0CE)",
    minHeight: "100vh",
    color: "white",
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
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  letterContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: "150px",
    fontWeight: "bold",
    textShadow: "4px 4px 10px rgba(0,0,0,0.5)",
  },
  imageContainer: {
    flex: 2,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
  imageWrapper: {
    textAlign: "center",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "10px",
    transition: "all 0.3s ease-in-out",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
  },
  imageLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "5px",
  },
  noImageText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default AlphabetImageMapping;