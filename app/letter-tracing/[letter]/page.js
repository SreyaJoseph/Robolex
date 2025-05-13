"use client";
import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useParams } from "next/navigation";

export default function LetterTracingPage() {
  // Retrieve the letter from the URL parameters
  const { letter } = useParams();
  
  // Default to the letter from params
  const [currentLetter, setCurrentLetter] = useState(letter || "A");
  const threshold = 70; // Perfection threshold

  // Canvas states
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Placeholder ideal points (customize these per letter as needed)
  const idealPoints = [
    { x: 150, y: 350 },
    { x: 250, y: 100 },
    { x: 350, y: 350 },
    { x: 250, y: 240 },
  ];

  const interpolatePoints = (p1, p2, numPoints) => {
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      points.push({
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
      });
    }
    return points;
  };

  const denseIdealPoints = [];
  for (let i = 0; i < idealPoints.length - 1; i++) {
    const segment = interpolatePoints(idealPoints[i], idealPoints[i + 1], 20);
    if (i > 0) segment.shift();
    denseIdealPoints.push(...segment);
  }

  // Draw the dotted letter on the canvas as a guide
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeText(currentLetter, canvas.width / 2, canvas.height / 2 + 50);
    ctx.setLineDash([]);
  }, [currentLetter]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setDrawnPoints([]);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    setDrawnPoints([{ x, y }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    const lastPoint = drawnPoints[drawnPoints.length - 1];
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setDrawnPoints((prev) => [...prev, { x, y }]);
  };

  const stopDrawing = () => setIsDrawing(false);

  const calculatePerfection = () => {
    const tolerance = 15;
    let matchingPoints = 0;

    denseIdealPoints.forEach((idealPt) => {
      let closestDistance = Infinity;
      drawnPoints.forEach((drawnPt) => {
        const dx = idealPt.x - drawnPt.x;
        const dy = idealPt.y - drawnPt.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        closestDistance = Math.min(closestDistance, distance);
      });

      if (closestDistance <= tolerance) {
        matchingPoints++;
      }
    });

    return (matchingPoints / denseIdealPoints.length) * 100;
  };

  const handleCheck = () => {
    const percentage = calculatePerfection();
    setResult(percentage.toFixed(2));
    setCompleted(true);
    if (percentage >= threshold) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRetry = () => {
    setDrawnPoints([]);
    setResult(null);
    setCompleted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Letter Tracing</h1>

      {/* Canvas for tracing */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="bg-white mb-4 border border-gray-500 rounded"
      />

      {/* Check Button */}
      {!completed && (
        <button
          onClick={handleCheck}
          className="bg-indigo-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-indigo-600 transition"
        >
          Check
        </button>
      )}

      {/* Results & Retry */}
      {completed && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl">Your tracing perfection is: {result}%</p>
          {result < threshold ? (
            <button
              onClick={handleRetry}
              className="bg-red-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-600 transition"
            >
              Retry
            </button>
          ) : (
            <p className="text-green-500 text-xl font-bold">Great job!</p>
          )}
        </div>
      )}
    </div>
  );
}
