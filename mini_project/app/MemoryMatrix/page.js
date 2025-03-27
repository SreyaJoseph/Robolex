"use client";
import React, { useState, useEffect } from "react";
import "./MemoryMatrix.css"; // Import the CSS file
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const images = [
  { id: "img1", src: "/images/rainbow.jpg" },
  { id: "img2", src: "/images/pencil.jpg" },
  { id: "img3", src: "/images/tortoise.png" },
  { id: "img4", src: "/images/icecream.jpg" },
  { id: "img5", src: "/images/egg.jpg" },
  { id: "img6", src: "/images/donut.jpg" },
  { id: "img7", src: "/images/sun.jpg" },
  { id: "img8", src: "/images/ball.jpg" },
];

const MemoryMatrix = () => {
  const router = useRouter(); // Initialize useRouter
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Shuffle and initialize the cards
  useEffect(() => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ ...image, key: index }));
    setCards(shuffledCards);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!gameWon) {
      const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [gameWon]);

  // Check if all pairs are matched
  useEffect(() => {
    if (matched.length === images.length) {
      setGameWon(true);
    }
  }, [matched]);

  const handleCardClick = (card) => {
    if (selected.length < 2 && !selected.includes(card) && !matched.includes(card.id)) {
      setSelected([...selected, card]);
    }
    if (selected.length === 1) {
      if (selected[0].id === card.id) {
        setMatched([...matched, card.id]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const resetGame = () => {
    setMatched([]);
    setSelected([]);
    setGameWon(false);
    setTime(0);
    setCards([...images, ...images].sort(() => Math.random() - 0.5));
  };

  const refreshGame = () => {
    window.location.reload(); // Full page reload
  };

  return (
    <div className="container">
      <header>
        <button className="back-btn" onClick={() => router.back()}>⬅ Back</button>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>Memory Matrix</h3>
        <p>Time: {time}s</p>
        <button onClick={refreshGame} className="refresh-btn">🔄 Refresh Game</button>
      </header>
      <main>
        <p>Click on two squares to find matching symbols. Try to match all pairs!</p>
        {gameWon && <div className="congratulations">🎉 Congratulations! You found all the pairs! 🎉</div>}
        {gameWon && <button onClick={resetGame}>Play Again</button>}
        <div className="game-board">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`card ${selected.includes(card) || matched.includes(card.id) ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">
                  <img src={card.src} alt="icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MemoryMatrix;
