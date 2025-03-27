"use client";  // ✅ Ensures this is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./PopTheBubble.css"; // ✅ Keep this if it exists

const PopTheBubble = () => {
  const router = useRouter();
  
  // ✅ Randomly navigate to either the fruit or animal edition
  const handleStartGame = () => {
    const editions = ["fruit", "animal"];
    const randomEdition = editions[Math.floor(Math.random() * editions.length)];
    router.push(`/PopTheBubble/${randomEdition}`); // ✅ Redirects automatically
  };

  return (
    <div className="game-container">
      <h1>Pop The Bubble</h1>
      <button onClick={handleStartGame} className="start-game">
        Pop the Bubble
      </button>
    </div>
  );
};

export default PopTheBubble;
