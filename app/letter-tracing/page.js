"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

export default function LetterTracingPage() {
  // 1) Read the letter from URL (or default to "A")
  const searchParams = useSearchParams();
  const letterFromQuery = searchParams.get("letter");
  const [selectedLetter, setSelectedLetter] = useState(letterFromQuery || "A");

  // 2) Success threshold for passing tracing (in %)
  const threshold = 75;

  // 3) Define how many strokes each letter requires
  const strokeMap = {
    A: 3,  B: 2,  C: 1,  D: 2,
    E: 4,  F: 3,  G: 1,  H: 3,
    I: 1,  J: 2,  K: 3,  L: 2,
    M: 4,  N: 3,  O: 1,  P: 2,
    Q: 2,  R: 2,  S: 1,  T: 2,
    U: 1,  V: 2,  W: 4,  X: 2,
    Y: 2,  Z: 3,
  };
  const requiredStrokes = strokeMap[selectedLetter] || 1;

  // 4) Canvas & drawing state
  const canvasRef = useRef(null);
  const letterMaskRef = useRef(null);
  const [strokes, setStrokes] = useState([]);      // array of stroke-arrays
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);

  // 5) Whenever the letter changes, clear & redraw guide + mask
  useEffect(() => {
    clearCanvas();
    drawLetter();
  }, [selectedLetter]);

  // 6) Draw the letter: first fill for mask, then stroke for guide
  const drawLetter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "300px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // a) Fill solid letter for mask
    ctx.fillStyle = "#00AEEF";
    ctx.fillText(selectedLetter, canvas.width / 2, canvas.height / 2 + 50);
    letterMaskRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // b) Overlay translucent stroke as guide
    ctx.strokeStyle = "rgba(0, 174, 239, 0.5)";
    ctx.lineWidth = 10;
    ctx.strokeText(selectedLetter, canvas.width / 2, canvas.height / 2 + 50);
  };

  // 7) Clear canvas and reset strokes + results
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setStrokes([]);
    setResult(null);
    setCompleted(false);
  };

  // 8) User starts a new stroke
  const startDrawing = (e) => {
    setIsDrawing(true);
    // begin a fresh stroke array
    setStrokes((prev) => [...prev, []]);

    // record the initial point
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    setStrokes((prev) => {
      const copy = [...prev];
      copy[copy.length - 1].push({ x, y });
      return copy;
    });
  };

  // 9) User drags to draw
  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    const ctx = canvasRef.current.getContext("2d");

    // draw red line segment
    const currentStroke = strokes[strokes.length - 1] || [];
    if (currentStroke.length > 0) {
      const last = currentStroke[currentStroke.length - 1];
      ctx.strokeStyle = "red";
      ctx.lineWidth = 22;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // append to current stroke
    setStrokes((prev) => {
      const copy = [...prev];
      copy[copy.length - 1].push({ x, y });
      return copy;
    });
  };

  // 10) End current stroke
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 11) Check if a canvas point (x,y) lies inside the filled letter mask
  const checkIfOnLetter = (x, y) => {
    const mask = letterMaskRef.current;
    if (!mask) return false;
    const idx = (Math.floor(y) * mask.width + Math.floor(x)) * 4;
    return mask.data[idx + 3] > 128;
  };

  // 12) Compute accuracy by sampling mask pixels vs all drawn points
  const calculatePerfection = () => {
    const tolerance = 40;
    let totalError = 0,
      sampleCount = 0;

    const mask = letterMaskRef.current;
    if (!mask) return 0;

    // flatten all strokes into one array for distance checks
    const allPoints = strokes.flat();

    for (let y = 0; y < mask.height; y += 15) {
      for (let x = 0; x < mask.width; x += 15) {
        const idx = (y * mask.width + x) * 4;
        if (mask.data[idx + 3] > 128) {
          sampleCount++;
          let dmin = Infinity;
          allPoints.forEach((pt) => {
            const dx = x - pt.x,
              dy = y - pt.y;
            const d = Math.hypot(dx, dy);
            if (d < dmin) dmin = d;
          });
          totalError += dmin;
        }
      }
    }

    if (sampleCount === 0) return 0;
    const avgError = totalError / sampleCount;
    return Math.max(0, 1 - avgError / tolerance) * 100;
  };

  // 13) When user clicks “Check”
  const handleCheck = () => {
    // require the correct number of strokes first
    if (strokes.length !== requiredStrokes) {
      setResult(
        `Used ${strokes.length} of ${requiredStrokes} strokes — please try again`
      );
      setCompleted(true);
      return;
    }

    // then compute and show accuracy
    const score = calculatePerfection();
    setResult(`${score.toFixed(2)}%`);
    setCompleted(true);
    if (score >= threshold) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  // 14) Retry: clear & redraw
  const handleRetry = () => {
    clearCanvas();
    drawLetter();
  };

  // 15) Render
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A2540] text-[#00AEEF] p-4">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-[#4169E1] px-6 py-3 rounded-lg text-white"
      >
        Back
      </button>
      <h1 className="text-4xl font-bold mb-4">Trace a Letter!</h1>

      {!letterFromQuery && (
        <select
          value={selectedLetter}
          onChange={(e) => setSelectedLetter(e.target.value)}
          className="mb-4 p-3 bg-[#1E90FF] text-white rounded text-lg"
        >
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ltr) => (
            <option key={ltr} value={ltr}>
              {ltr}
            </option>
          ))}
        </select>
      )}

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="bg-[#12263A] mb-4 border-4 border-[#1E90FF] rounded-lg"
      />

      {!completed ? (
        <button
          onClick={handleCheck}
          className="bg-[#37b1ee] px-6 py-3 rounded-lg text-white text-lg"
        >
          Check
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-2xl">{typeof result === 'string' ? result : `Your accuracy: ${result}`}</p>
          <button
            onClick={handleRetry}
            className="bg-[#FF4500] px-6 py-3 rounded-lg text-white text-lg"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
