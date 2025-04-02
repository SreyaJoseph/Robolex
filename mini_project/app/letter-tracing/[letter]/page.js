"use client";
import { useRouter, useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function LetterTracingPage() {
  const router = useRouter();
  const { letter } = useParams(); // e.g. "A"
  
  // For simplicity, we’ll define a static array of letters A–Z.
  const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const currentIndex = ALPHABETS.indexOf(letter.toUpperCase());
  
  // If letter is invalid or not found in ALPHABETS, handle gracefully.
  if (currentIndex === -1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Invalid Letter: {letter}</h1>
        <button
          onClick={() => router.push("/letter-tracing/A")}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-600 transition"
        >
          Go to Letter A
        </button>
      </div>
    );
  }

  // Next letter logic: if we're not at 'Z', next letter is ALPHABETS[currentIndex + 1]
  const nextLetter = currentIndex < ALPHABETS.length - 1
    ? ALPHABETS[currentIndex + 1]
    : null;

  // Perfection threshold, 70% by default
  const threshold = 70;

  // Canvas states
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);

  // ----- Ideal Points (placeholder for letter "A") -----
  // In a real scenario, define different idealPoints for each letter.
  const idealPoints = [
    { x: 150, y: 350 },
    { x: 250, y: 100 },
    { x: 350, y: 350 },
    { x: 250, y: 240 },
  ];

  // Interpolate to create a dense path for perfection checking
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

  // ----- Draw the dotted letter on the canvas -----
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a dotted outline of the letter
    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 2;
    // Shift letter down 50px for aesthetics
    ctx.strokeText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2 + 50);
    ctx.setLineDash([]);
  }, [letter]);

  // ----- Drawing logic -----
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

  // ----- Calculate Perfection -----
  const calculatePerfection = () => {
    // Max allowable distance from ideal point (in pixels)
    const tolerance = 15; 
  
    let matchingPoints = 0;
  
    // Loop through each ideal point
    denseIdealPoints.forEach((idealPt) => {
      let closestDistance = Infinity;
  
      // Compare to each drawn point
      drawnPoints.forEach((drawnPt) => {
        const dx = idealPt.x - drawnPt.x;
        const dy = idealPt.y - drawnPt.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        closestDistance = Math.min(closestDistance, distance);
      });
  
      // If the closest drawn point is within the tolerance, count it as a match
      if (closestDistance <= tolerance) {
        matchingPoints++;
      }
    });
  
    // Calculate the perfection percentage based on how many ideal points were matched
    const perfection = (matchingPoints / denseIdealPoints.length) * 100;
  
    return perfection;
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw the dotted letter
    ctx.font = "200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2 + 50);
    ctx.setLineDash([]);
    
    setDrawnPoints([]);
    setResult(null);
    setCompleted(false);
  };

  const handleTryLater = () => {
    alert("You can try this activity later!");
  };

  // ----- Next Letter Navigation -----
  const handleNextLetter = () => {
    if (nextLetter) {
      router.push(`/letter-tracing/${nextLetter}`);
    } else {
      alert("You've completed all letters!");
    }  
  };

  // ----- Back Button Navigation -----
  const handleBack = () => {
    router.push("/first-year"); // Replace with the correct URL of your first-year page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-800 px-4 py-2 text-white rounded-lg hover:bg-gray-700 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4">Trace Letter: {letter.toUpperCase()}</h1>
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

      {/* Show "Check" if not completed */}
      {!completed && (
        <button
          onClick={handleCheck}
          className="bg-indigo-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-indigo-600 transition"
        >
          Check
        </button>
      )}

      {/* Once completed, show the result */}
      {completed && (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl">Your tracing perfection is: {result}%</p>

          {result < threshold ? (
            <div className="flex space-x-4">
              <button
                onClick={handleRetry}
                className="bg-red-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-600 transition"
              >
                Retry
              </button>
              <button
                onClick={handleTryLater}
                className="bg-yellow-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-yellow-600 transition"
              >
                Try Later
              </button>
            </div>
          ) : (
            <p className="text-green-500 text-xl font-bold">Great job!</p>
          )}

          {/* Next Letter Button (if not the last letter) */}
          {currentIndex < ALPHABETS.length - 1 && (
            <button
              onClick={handleNextLetter}
              className="bg-blue-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-blue-600 transition"
            >
              Next Letter ({ALPHABETS[currentIndex + 1]})
            </button>
          )}

          {/* If it's the last letter (Z), show a different message or button */}
          {currentIndex === ALPHABETS.length - 1 && (
            <button
              onClick={() => alert("You've completed all letters!")}
              className="bg-green-500 px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-green-600 transition"
            >
              All Done
            </button>
          )}
        </div>
      )}
    </div>
  );
}
