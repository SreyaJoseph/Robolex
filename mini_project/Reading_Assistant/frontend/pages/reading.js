import React, { useState, useEffect } from "react";

const ReadingAssistant = ({ text = "" }) => {
    if (!text) {
        return <p style={{ color: "red" }}>Error: No text provided for reading.</p>;
    }

    const [words, setWords] = useState(text.split(" "));
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [recognizedText, setRecognizedText] = useState("");
    const [isRecognizing, setIsRecognizing] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    useEffect(() => {
        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript.trim();
            setRecognizedText(transcript);

            if (transcript.toLowerCase() === words[currentWordIndex].toLowerCase()) {
                setCurrentWordIndex((prevIndex) => prevIndex + 1);
            } else {
                alert(`Try again! Correct pronunciation: ${words[currentWordIndex]}`);
            }
        };

        recognition.onend = () => {
            setIsRecognizing(false);
        };
    }, [currentWordIndex, words]);

    const startRecognition = () => {
        if (!isRecognizing) {
            recognition.start();
            setIsRecognizing(true);
        }
    };

    return (
        <div className="reading-container">
            <h2>Reading Assistant</h2>
            <p>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={index === currentWordIndex ? "highlight" : ""}
                    >
                        {word}{" "}
                    </span>
                ))}
            </p>
            <button onClick={startRecognition} disabled={isRecognizing}>
                Start Reading
            </button>
        </div>
    );
};

export default ReadingAssistant;
