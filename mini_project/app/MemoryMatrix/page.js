"use client";
import React, { useState, useEffect } from "react";
import "./MemoryMatrix.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Shuffle and initialize cards
  useEffect(() => {
    const shuffled = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueKey: `${card.id}-${index}` }));
    setCards(shuffled);
  }, []);

  // Start timer
  useEffect(() => {
    if (!gameWon) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameWon]);

  // Check win condition
  useEffect(() => {
    if (matched.length === images.length) {
      setGameWon(true);
    }
  }, [matched]);

  const handleCardClick = (card) => {
    if (
      selected.length < 2 &&
      !selected.includes(card) &&
      !matched.includes(card.id)
    ) {
      const newSelected = [...selected, card];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        if (newSelected[0].id === newSelected[1].id) {
          setMatched((prev) => [...prev, card.id]);
          setTimeout(() => setSelected([]), 500);
        } else {
          setTimeout(() => setSelected([]), 800);
        }
      }
    }
  };

  const resetGame = () => {
    const reshuffled = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueKey: `${card.id}-${index}` }));
    setMatched([]);
    setSelected([]);
    setGameWon(false);
    setTime(0);
    setCards(reshuffled);
  };

  const refreshGame = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <header>
        <button className="back-btn" onClick={() => router.back()}>
          ⬅ Back
        </button>
        <h3 style={{ fontSize: "25px", fontWeight: "bold", color: "white" }}>
          Memory Matrix
        </h3>
        <p>Time: {time}s</p>
        <button onClick={refreshGame} className="refresh-btn">
          🔄 Refresh Game
        </button>
      </header>

      <main>
        <p>
          Click on two squares to find matching symbols. Try to match all
          pairs!
        </p>

        {gameWon && (
          <div className="congratulations">
            🎉 Congratulations! You found all the pairs! 🎉
          </div>
        )}
        {gameWon && <button onClick={resetGame}>Play Again</button>}

        <div className="game-board">
          {cards.map((card) => {
            const isFlipped =
              selected.includes(card) || matched.includes(card.id);
            return (
              <div
                key={card.uniqueKey}
                className={`card ${isFlipped ? "flipped" : ""}`}
                onClick={() => handleCardClick(card)}
              >
                <div className="card-inner">
                  <div className="card-front"></div>
                  <div className="card-back">
                    <img src={card.src} alt="icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MemoryMatrix;
