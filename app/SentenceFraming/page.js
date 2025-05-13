"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const boyImage = "/Assets/boy.png"; 
const girlImage = "/Assets/girl.jpg";

const SentenceFraming = () => {
    const router = useRouter();

    useEffect(() => {
        if (window.location.pathname !== "/SentenceFraming") {
            router.push("/SentenceFraming");
        }
    }, []);

    const [isBoy, setIsBoy] = useState(true);
    const [voices, setVoices] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [highlightedText, setHighlightedText] = useState("");

    const boySentences = [
        "Hey, I'm Ram!",
        "I'm 8 years old.",
        "I love playing football!",
        "My favorite color is blue!",
        "I have a pet dog named Bruno!"
    ];

    const girlSentences = [
        "Hey, I'm Sita!",
        "I'm 7 years old.",
        "I love painting!",
        "My favorite color is pink!",
        "I have a pet cat named Whiskers!"
    ];

    const sentences = isBoy ? boySentences : girlSentences;

    // Load voices
    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    const speakSentence = (index) => {
        if (index >= sentences.length) return;
        
        const sentence = sentences[index];
        let charIndex = 0;
        
        const interval = setInterval(() => {
            setHighlightedText(sentence.substring(0, charIndex + 1));
            charIndex++;
            if (charIndex >= sentence.length) clearInterval(interval);
        }, 100);

        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = voices.find(voice => 
            isBoy ? voice.name.toLowerCase().includes("child") : voice.name.toLowerCase().includes("female")
        ) || null;

        utterance.onend = () => {
            setTimeout(() => setHighlightIndex(prev => prev + 1), 1000);
        };

        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        speakSentence(highlightIndex);
    }, [highlightIndex]);

    const repeatSpeech = () => {
        setHighlightIndex(0);
    };

    const switchCharacter = () => {
        setIsBoy(prev => !prev);
        setHighlightIndex(0);  // Reset highlighting and speech progression
        setHighlightedText(""); // Clear text to avoid overlap
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Self Introduction</h1>
            <button style={styles.toggleButton} onClick={switchCharacter}>
                Switch to {isBoy ? "Girl" : "Boy"}
            </button>
            <div style={styles.content}>
                <img src={isBoy ? boyImage : girlImage} alt={isBoy ? "Boy" : "Girl"} style={styles.characterImage} />
                <div style={styles.dialogueBox}>
                    {sentences.map((sentence, index) => (
                        <p
                            key={index}
                            style={{
                                ...styles.sentence,
                                color: index === highlightIndex ? "#ffcc00" : "#000",
                                textShadow: index === highlightIndex ? "0 0 10px #ffcc00" : "none"
                            }}
                        >
                            {index === highlightIndex ? highlightedText : sentence}
                        </p>
                    ))}
                </div>
            </div>
            <button style={styles.button} onClick={repeatSpeech}>Hear Again</button>
            <button style={styles.doneButton} onClick={() => router.back()}>Done</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        background: "linear-gradient(to bottom, #D4F1F4, #75E6DA)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#05445E",
    },
    heading: {
        fontSize: "40px",
        fontWeight: "bold",
        fontFamily: "'Baloo Bhaijaan 2', cursive",
        marginBottom: "20px",
        marginTop: "40px",
    },
    toggleButton: {
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#ff5733",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        marginBottom: "20px",
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        width: "80%",
    },
    characterImage: {
        width: "350px",
        height: "auto",
        animation: "float 3s ease-in-out infinite",
    },
    dialogueBox: {
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        width: "60%",
        textAlign: "left",
        fontSize: "22px",
        fontWeight: "bold",
        fontFamily: "'Baloo Bhaijaan 2', cursive",
        border: "3px solid #05445E",
    },
    sentence: {
        margin: "10px 0",
        padding: "5px",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#05445E",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    doneButton: {
        marginTop: "10px",
        padding: "10px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#28a745",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    }
};

export default SentenceFraming;
