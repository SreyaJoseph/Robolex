"use client"; // ✅ Next.js requirement

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ Next.js router
import "../PopTheBubble.css";

const COLORS = ["#FFD700", "#50C878", "#DC143C"]; // Gold, Green, Red
const OBJECTS = [
  { name: "Apple", color: "#DC143C", img: "/Assets/apple.jpg" },
  { name: "Grapes", color: "#50C878", img: "/Assets/grapes.jpg" },
  { name: "Mango", color: "#FFD700", img: "/Assets/mango.jpg" },
  { name: "Avocado", color: "#50C878", img: "/Assets/avocado.jpg" },
  { name: "Banana", color: "#FFD700", img: "/Assets/banana.jpg" },
  { name: "Cherry", color: "#DC143C", img: "/Assets/cherry.jpg" },
  { name: "Strawberry", color: "#DC143C", img: "/Assets/strawberry.jpg" },
  { name: "Lemon", color: "#FFD700", img: "/Assets/lemon.jpg" },
];

const PopTheBubbleFruit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const order = searchParams.get("order") || "fruit-first"; // Default order

  const [popped, setPopped] = useState({
    "#FFD700": false,
    "#50C878": false,
    "#DC143C": false,
  });

  const [availableObjects, setAvailableObjects] = useState(OBJECTS);
  const [celebration, setCelebration] = useState("");
  const [screenColor, setScreenColor] = useState(null);

  const isFruitFirst = order === "fruit-first";
  const isLastPage = !isFruitFirst; // If fruit is first, animal is last, and vice versa

  const handleDrop = (color, object) => {
    if (object.color === color) {
      setPopped((prev) => ({ ...prev, [color]: true }));
      setAvailableObjects((prev) => prev.filter((o) => o.name !== object.name));
      setScreenColor(color);
      setCelebration(`Great job! You matched ${object.name}! 🎉`);


      setTimeout(() => {
        setScreenColor(null);
        setPopped((prev) => ({ ...prev, [color]: false }));
      }, 1000);

      setTimeout(() => setCelebration(""), 2000);
    }
  };

  return (
    <div 
  className="game-container" 
  style={{ 
    background: screenColor ? screenColor : "url('/oceanbg.jpg')",
    transition: "background-color 0.5s ease-in-out"
  }}
>

      <h1 className="title">Match the Color - Fruit Edition! 🍎🍌🍇</h1>

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

      {/* 🔹 Back & Next Button Logic */}
      <div className="button-container">
        {isLastPage ? (
          // Last Page (Only Back Button)
          <button className="back-button" onClick={() => router.push("/Words")}>
            🔙 Back
          </button>
        ) : (
          // Not Last Page (Show Next & Back Buttons)
          <>
            <button className="back-button" onClick={() => router.push("/Words")}>
              🔙 Back
            </button>
            <button
              className="next-button"
              onClick={() => {
                if (isFruitFirst) {
                  router.push(`/PopTheBubble/animal?order=${order}`);
                } else {
                  router.push(`/PopTheBubble/fruit?order=${order}`);
                }
              }}
            >
              ➡️ Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopTheBubbleFruit;
