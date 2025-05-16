"use client";

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export default function ReadAloudPage() {
  const [words, setWords] = useState([]);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState("");
  const [reviseList, setReviseList] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recogRef = useRef(null);

  // OCR
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus("⏳ Extracting text…");
    const { data: { text } } = await Tesseract.recognize(file, "eng");
    const clean = text.replace(/\s+/g, " ").trim();
    setWords(clean.split(" "));
    setIdx(0);
    setReviseList([]);
    setStatus("✔️ Text ready! Click Play to begin.");
  };

  // TTS
  const repeatWord = () => {
    const w = words[idx];
    if (!w) return;
    const u = new SpeechSynthesisUtterance(w);
    u.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  // STT via Web Speech API
  const checkPronunciation = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Your browser does not support SpeechRecognition.");

    const current = words[idx]?.toLowerCase();
    if (!current) return;

    // Tear down any previous instance
    if (recogRef.current) {
      recogRef.current.onend = null;
      try { recogRef.current.stop(); } catch {}
    }

    setStatus("🎙️ Listening…");
    setIsListening(true);

    const recog = new SR();
    recogRef.current = recog;
    recog.lang = "en-US";
    recog.interimResults = true;   // show partial results
    recog.continuous = true;       // keep session open
    recog.maxAlternatives = 1;

    let heardAny = false;
    const timeoutId = setTimeout(() => {
      if (!heardAny) {
        setStatus("⏰ No response—added to revise list");
        setReviseList(p => p.includes(current) ? p : [...p, current]);
        try { recog.stop(); } catch {}
      }
    }, 8000); // give 8s for user to speak

    // Log audio events
    recog.onstart       = () => console.log("🔔 onstart");
    recog.onaudiostart  = () => console.log("🔔 onaudiostart");
    recog.onsoundstart  = () => console.log("🔔 onsoundstart");
    recog.onspeechstart = () => console.log("🔔 onspeechstart");

    recog.onresult = (e) => {
      heardAny = true;
      clearTimeout(timeoutId);

      // Combine interim transcripts
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      transcript = transcript.trim().toLowerCase();
      console.log(e.results[e.results.length - 1].isFinal ? "🟢 Final:" : "🟡 Interim:", transcript);

      if (e.results[e.results.length - 1].isFinal) {
        if (transcript === current) {
          setStatus("✅ Correct!");
        } else {
          setStatus(`❌ Heard “${transcript}”`);
          setReviseList(p => p.includes(current) ? p : [...p, current]);
          repeatWord();
        }
        try { recog.stop(); } catch {}
      }
    };

    recog.onerror = (e) => {
      console.error("❌ onerror", e.error);
      clearTimeout(timeoutId);
      setStatus("⚠️ Recognition error");
    };

    recog.onend = () => {
      clearTimeout(timeoutId);
      setIsListening(false);
      console.log("🔔 onend");
    };

    recog.start();
  };

  // Next word
  const nextWord = () => {
    if (idx < words.length - 1) {
      setIdx(i => i + 1);
      setStatus("");
      repeatWord();
    } else {
      setStatus("🎉 Done! Review your tricky words below.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Reading Assistance</h1>
      <input type="file" accept="image/*" onChange={handleFile} />

      {words.length > 0 && (
        <>
          <p style={{ margin: "1rem 0", lineHeight: 1.6 }}>
            {words.map((w, i) => (
              <span
                key={i}
                style={{
                  background: i === idx ? "yellow" : "transparent",
                  padding: "0 .25rem",
                }}
              >
                {w}{" "}
              </span>
            ))}
          </p>
          <div style={{ marginBottom: 20 }}>
            <button onClick={repeatWord} style={{ marginRight: 8 }}>
              🔁 Play
            </button>
            <button
              onClick={checkPronunciation}
              disabled={isListening}
              style={{ marginRight: 8 }}
            >
              🎤 Check
            </button>
            <button onClick={nextWord}>➡️ Next</button>
          </div>
        </>
      )}

      {status && <p style={{ fontWeight: "bold" }}>{status}</p>}

      {idx >= words.length - 1 && reviseList.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2>Revise Later</h2>
          {reviseList.map((w) => (
            <button
              key={w}
              onClick={() => {
                const u = new SpeechSynthesisUtterance(w);
                u.lang = "en-US";
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(u);
              }}
              style={{ margin: 5, padding: "5px 10px" }}
            >
              🔊 {w}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
