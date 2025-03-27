"use client"; // ✅ Next.js requirement

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter for navigation
import "../PopTheBubble.css";

const COLORS = ["black", "brown", "white"];
const INITIAL_OBJECTS = [
  { name: "Polar Bear", color: "white", img: "/Assets/polarbear.jpg" },
  { name: "Crow", color: "black", img: "/Assets/crow.jpg" },
  { name: "Horse", color: "brown", img: "/Assets/horse.jpg" },
  { name: "Cat", color: "black", img: "/Assets/blackcat.jpg" },
  { name: "Bear", color: "brown", img: "/Assets/bear.png" },
  { name: "Swan", color: "white", img: "/Assets/swan.jpg" },
  { name: "Panther", color: "black", img: "/Assets/panther.jpg" },
  { name: "Goat", color: "white", img: "/Assets/goat.jpg" },
];

const PopTheBubbleAnimals = () => {
  const router = useRouter(); // ✅ Initialize router
  const [matched, setMatched] = useState({ black: [], brown: [], white: [] });
  const [popped, setPopped] = useState({ black: false, brown: false, white: false });
  const [availableObjects, setAvailableObjects] = useState(INITIAL_OBJECTS);
  const [celebration, setCelebration] = useState("");
  const [screenColor, setScreenColor] = useState(null);

  const handleDrop = (color, object) => {
    if (object.color === color) {
      const updatedMatches = { ...matched, [color]: [...matched[color], object] };
      setMatched(updatedMatches);
      setAvailableObjects((prev) => prev.filter((obj) => obj.name !== object.name));
      setScreenColor(color);
      setCelebration(`Great job! You matched ${object.name}! 🎉`);

      setTimeout(() => {
        setScreenColor(null);
        setCelebration("");
      }, 1000);

      if (updatedMatches[color].length === INITIAL_OBJECTS.filter((o) => o.color === color).length) {
        setPopped((prev) => ({ ...prev, [color]: true }));
      }
    }
  };

  return (
    <div className="game-container" style={{ background: screenColor ? screenColor : "url('/oceanbg.jpg')",
      transition: "background-color 0.5s ease-in-out" }}>
      <h1 className="title">Match the Color-Animals/Birds Edition!</h1>

      {/* Big bubbles container */}
      <div className="bubble-wrapper">
        {COLORS.map((color) => (
          <div
            key={color}
            className={`big-bubble ${popped[color] ? "popped" : ""}`}
            style={{ backgroundColor: color }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const object = JSON.parse(e.dataTransfer.getData("object"));
              handleDrop(color, object);
            }}
          ></div>
        ))}
      </div>

      <div className="small-bubbles-container">
        {availableObjects.map((object, index) => (
          <div
            key={index}
            className="small-bubble"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("object", JSON.stringify(object))}
          >
            <img src={object.img} alt={object.name} />
          </div>
        ))}
      </div>

      {celebration && <div className="celebration">{celebration}</div>}

      {/* Back & Next Buttons */}
      <div className="button-container">
        <button className="back-button" onClick={() => router.push("/Words")}>🔙 Back</button>
        <button className="next-button" onClick={() => router.push("/PopTheBubble/fruit")}>Next ➡️</button>
      </div>
    </div>
  );
};

export default PopTheBubbleAnimals;
