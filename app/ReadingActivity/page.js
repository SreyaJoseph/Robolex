"use client";

import React, { useState, useEffect, useRef } from "react";
import Tesseract from "tesseract.js";

const SpeechReadingApp = () => {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [mistakes, setMistakes] = useState([]);

  const recognitionRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      const spoken = event.results[0][0].transcript.trim().toLowerCase();
      const expected = words[currentWordIndex]?.toLowerCase();
      if (!expected) return;
      if (spoken === expected) {
        setFeedback("✅ Correct");
      } else {
        setFeedback(`❌ Incorrect (You said: "${spoken}")`);
        setMistakes((prev) => [...prev, expected]);
      }
      setTimeout(() => {
        setFeedback("");
        moveToNextWord();
      }, 1000);
    };

    recognition.onerror = (event) => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      setFeedback("⚠️ Error or no input. Moving on.");
      const expected = words[currentWordIndex]?.toLowerCase();
      if (expected) {
        setMistakes((prev) => [...prev, expected]);
      }
      setTimeout(() => {
        setFeedback("");
        moveToNextWord();
      }, 1000);
    };

    return () => {
      try {
        recognition.abort();
      } catch (e) {
        console.warn(e);
      }
    };
  }, []);

  const readCurrentWord = () => {
    if (isPaused || currentWordIndex >= words.length) return;
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    try {
      recognitionRef.current.abort();
    } catch (err) {
      console.warn(err);
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.8;
    utterance.onend = () => {
      setTimeout(() => {
        startListening();
      }, 200);
    };
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.warn("Error starting recognition:", err);
        }
        responseTimeoutRef.current = setTimeout(handleNoResponse, 10000);
      })
      .catch((err) => {
        console.warn("Microphone access error:", err);
        setFeedback("Microphone access error");
      });
  };

  const handleNoResponse = () => {
    setFeedback("No response. Moving on...");
    setMistakes((prev) => [...prev, words[currentWordIndex]]);
    setTimeout(() => {
      setFeedback("");
      moveToNextWord();
    }, 1000);
  };

  const moveToNextWord = () => {
    window.speechSynthesis.cancel();
    try {
      recognitionRef.current.abort();
    } catch (e) {
      console.warn(e);
    }
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setTimeout(() => {
        if (!isPaused) {
          readCurrentWord();
        }
      }, 500);
    } else {
      setFeedback("✅ All done!");
      setIsSessionActive(false);
    }
  };

  const handleStartReading = async () => {
    const wordList = text.trim().split(/\s+/).filter(Boolean);
    if (wordList.length === 0) {
      setFeedback("Please enter or upload some text first.");
      return;
    }
    setWords(wordList);
    setMistakes([]);
    setCurrentWordIndex(0);
    setFeedback("Starting reading...");
    setIsSessionActive(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      setFeedback("Error: Microphone access denied.");
      return;
    }

    readCurrentWord();
  };

  const repeatCurrentWord = () => {
    readCurrentWord();
  };

  const pauseReading = () => {
    setIsPaused(true);
    window.speechSynthesis.cancel();
    try {
      recognitionRef.current.abort();
    } catch (err) {
      console.warn(err);
    }
    setFeedback("⏸️ Paused");
  };

  const resumeReading = () => {
    setIsPaused(false);
    setFeedback("▶️ Resumed");
    readCurrentWord();
  };

  const stopReading = () => {
    setIsSessionActive(false);
    setIsPaused(false);
    window.speechSynthesis.cancel();
    setFeedback("❌ Stopped");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFeedback("");
    try {
      const {
        data: { text: ocrText },
      } = await Tesseract.recognize(file, "eng");
      setText(ocrText);
      const extractedWords = ocrText.trim().split(/\s+/).filter(Boolean);
      setWords(extractedWords);
      setCurrentWordIndex(0);
      setMistakes([]);
      setFeedback("✅ Image processed. Ready to start reading.");
    } catch (err) {
      console.error("OCR extraction error:", err);
      setFeedback("Error extracting text from image.");
    }
  };

  const tryMistakes = () => {
    if (mistakes.length > 0) {
      setFeedback("🔁 Retrying mispronounced words...");
      setWords(mistakes);
      setMistakes([]);
      setCurrentWordIndex(0);
      setIsSessionActive(true);
      setTimeout(() => {
        readCurrentWord();
      }, 500);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2>🗣️ Reading Practice App</h2>
      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSessionActive}
        placeholder="Enter text here..."
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: "1rem" }}
      />
      <div style={{ marginBottom: "1rem" }}>
        {!isSessionActive ? (
          <button onClick={handleStartReading} style={{ marginRight: "1rem" }}>
            ▶️ Start Reading
          </button>
        ) : (
          <>
            <button onClick={stopReading} style={{ marginRight: "1rem" }}>
              ⏹️ Stop
            </button>
            <button onClick={pauseReading} style={{ marginRight: "1rem" }}>
              ⏸️ Pause
            </button>
            <button onClick={resumeReading} style={{ marginRight: "1rem" }}>
              ▶️ Resume
            </button>
            <button onClick={repeatCurrentWord} style={{ marginRight: "1rem" }}>
              🔁 Repeat
            </button>
          </>
        )}
        <button
          onClick={() => {
            stopReading();
            try {
              recognitionRef.current.abort();
            } catch (e) {
              console.warn(e);
            }
            window.history.back();
          }}
        >
          🔙 Back
        </button>
      </div>
      {!isSessionActive && mistakes.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={tryMistakes}>🔁 Try Mispronounced Words</button>
        </div>
      )}
      <div style={{ fontSize: "1.2rem" }}>
        {words.length > 0 && (
          <p>
            <strong>Reading Text: </strong>
            {words.map((word, idx) => (
              <span
                key={idx}
                style={{
                  padding: "0.2rem",
                  backgroundColor:
                    idx === currentWordIndex ? "yellow" : "transparent",
                }}
              >
                {word} {" "}
              </span>
            ))}
          </p>
        )}
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
};

export default SpeechReadingApp;