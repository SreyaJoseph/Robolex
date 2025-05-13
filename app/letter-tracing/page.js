"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

export default function LetterTracingPage() {
  // Read the letter from query parameters, if provided
  const searchParams = useSearchParams();
  const letterFromQuery = searchParams.get("letter");
  
  // Use provided letter or fallback to "A"
  const [selectedLetter, setSelectedLetter] = useState(letterFromQuery || "A");
  
  // Success threshold for passing tracing (in %)
  const threshold = 75; 
  // Maximum number of strokes allowed (for penalizing over-drawing)
  const maxPoints = 500;
  
  // Canvas and drawing state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  
  // We'll store the guide letter's pixel data here for accuracy checking
  const letterMaskRef = useRef(null);
  
  // Redraw the guide letter whenever the selected letter changes
  useEffect(() => {
    drawLetter();
  }, [selectedLetter]);
  
  const drawLetter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    canvas.width = 500;
    canvas.height = 400;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "300px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#00AEEF";
    ctx.fillText(selectedLetter, canvas.width / 2, canvas.height / 2 + 50);
    
    // Save the pixel data for later accuracy checking
    letterMaskRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };
  
  const startDrawing = () => {
    setIsDrawing(true);
    setDrawnPoints([]);
    setAccuracy(100);
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    // Draw a line segment if there is a previous point
    if (drawnPoints.length > 0) {
      const lastPoint = drawnPoints[drawnPoints.length - 1];
      ctx.strokeStyle = "red";
      ctx.lineWidth = 22;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    // Check if the current point is on the letter using the guide mask
    const isOnLetter = checkIfOnLetter(x, y);
    if (!isOnLetter) {
      setAccuracy((prev) => Math.max(0, prev - 5));
    }
    
    // Penalize if too many strokes are drawn
    if (drawnPoints.length > maxPoints) {
      setAccuracy((prev) => Math.max(0, prev - 1));
    }
    
    setDrawnPoints((prev) => [...prev, { x, y }]);
  };
  
  const stopDrawing = () => setIsDrawing(false);
  
  // Use the letter mask to check if the pixel is part of the ideal letter
  const checkIfOnLetter = (x, y) => {
    if (!letterMaskRef.current) return false;
    const { data, width } = letterMaskRef.current;
    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
    return data[index + 3] > 100;
  };
  
  // New accuracy calculation using average error:
  // For each sampled pixel (every 10 pixels) that is part of the letter,
  // compute the distance to the nearest drawn point.
  // Then, average these distances and normalize:
  //   normalizedAccuracy = max(0, 1 - (avgError / tolerance)) * 100.
  const calculatePerfection = () => {
    const tolerance = 40; // maximum acceptable average error (in pixels)
    let totalError = 0;
    let sampleCount = 0;
    
    const canvas = canvasRef.current;
    if (!canvas || !letterMaskRef.current) return 0;
    
    const { data, width, height } = letterMaskRef.current;
    
    // Sample a grid (every 10 pixels) over the canvas
    for (let y = 0; y < height; y += 15) {
      for (let x = 0; x < width; x += 15) {
        const idx = (y * width + x) * 4;
        // Only consider pixels that are part of the ideal letter (alpha > 100)
        if (data[idx + 3] > 100) {
          sampleCount++;
          let dmin = Infinity;
          drawnPoints.forEach((pt) => {
            const dx = x - pt.x;
            const dy = y - pt.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            dmin = Math.min(dmin, dist);
          });
          totalError += dmin;
        }
      }
    }
    
    if (sampleCount === 0) return 0;
    const avgError = totalError / sampleCount;
    const normalizedAccuracy = Math.max(0, 1 - avgError / tolerance) * 100;
    return normalizedAccuracy;
  };
  
  const handleCheck = () => {
    if (drawnPoints.length === 0) return;
    const accuracyPercentage = calculatePerfection();
    setResult(accuracyPercentage.toFixed(2));
    setCompleted(true);
    if (accuracyPercentage >= threshold) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };
  
  const handleRetry = () => {
    setDrawnPoints([]);
    setResult(null);
    setCompleted(false);
    setAccuracy(100);
    drawLetter();
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A2540] text-[#00AEEF] p-4">
      {/* Back button (navigates back) */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-[#4169E1] px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-[#1E90FF] transition"
      >
        Back
      </button>
  
      <h1 className="text-4xl font-bold mb-4">Trace a Letter!</h1>
  
      {/* Show the letter selection dropdown only if no letter was provided via query */}
      {!letterFromQuery && (
        <select
          value={selectedLetter}
          onChange={(e) => {
            setSelectedLetter(e.target.value);
            handleRetry();
          }}
          className="mb-4 p-3 bg-[#1E90FF] text-white border border-gray-500 rounded text-lg"
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
  
      {!completed && (
        <button
          onClick={handleCheck}
          className="bg-[#37b1ee] px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-[#008B8B] transition"
        >
          Check
        </button>
      )}
  
      {completed && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-2xl">Your tracing accuracy: {result}%</p>
          <button
            onClick={handleRetry}
            className="bg-[#FF4500] px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-[#B22222] transition"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
