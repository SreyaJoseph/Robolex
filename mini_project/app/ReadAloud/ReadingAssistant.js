'use client';
import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import levenshtein from 'js-levenshtein';
import { useRouter } from 'next/navigation';

export default function ReadingAssistant() {
  const [rawText, setRawText] = useState('');
  const [words, setWords] = useState([]);
  const [reviseQueue, setReviseQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isRevising, setIsRevising] = useState(false);

  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const router = useRouter();

  // Cleanup on unmount
  useEffect(() => {
    return () => stopListening();
  }, []);

  // OCR: extract text
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('Extracting text...');
    const { data: { text } } = await Tesseract.recognize(file, 'eng');
    const cleaned = text.replace(/[.,!?;:\n]/g, ' ').toLowerCase();
    const arr = cleaned.split(/\s+/).filter(Boolean);
    setRawText(text);
    setWords(arr);
    setReviseQueue([]);
    setCurrentIndex(0);
    setIsSessionActive(false);
    setIsRevising(false);
    setStatus('Text extracted. Click “Start Reading”.');
  };

  // Speak a word then start listening
  const speak = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.onend = () => startListening();
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
    setStatus(`Reading: "${word}"`);
  };

  // Initialize speech recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.lang = 'en-US';
    recog.interimResults = false;

    recog.onstart = () => {
      clearTimeout(silenceTimerRef.current);
      setStatus('Listening...');
      silenceTimerRef.current = setTimeout(() => {
        setStatus('No response, please try again.');
        speak(words[currentIndex]);
      }, 5000);
    };

    recog.onresult = (ev) => {
      clearTimeout(silenceTimerRef.current);
      const transcript = ev.results[0][0].transcript.trim().toLowerCase();
      setStatus(`Heard: "${transcript}"`);
      verifyPronunciation(transcript);
    };

    recog.onerror = (e) => {
      setStatus('Mic error: ' + (e.error || ''));
    };

    recog.onend = () => {
      // do nothing; speak() will restart
    };

    recog.start();
    recognitionRef.current = recog;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    clearTimeout(silenceTimerRef.current);
  };

  // Check pronunciation
  const verifyPronunciation = (input) => {
    const expected = words[currentIndex];
    const dist = levenshtein(input, expected);
    if (dist <= 2) {
      setStatus('✅ Correct!');
      nextWord();
    } else {
      setStatus('❌ Incorrect. Try again.');
      if (!reviseQueue.includes(expected)) {
        setReviseQueue(prev => [...prev, expected]);
      }
      speak(expected);
    }
  };

  // Advance or revise words
  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      speak(words[nextIdx]);
    } else if (!isRevising && reviseQueue.length) {
      setWords(reviseQueue);
      const firstRev = reviseQueue[0];
      setReviseQueue([]);
      setCurrentIndex(0);
      setIsRevising(true);
      setStatus('Starting revision...');
      speak(firstRev);
    } else {
      stopListening();
      setIsSessionActive(false);
      setIsRevising(false);
      setStatus('🎉 Session complete!');
    }
  };

  // Start reading session
  const handleStart = () => {
    if (words.length) {
      setCurrentIndex(0);
      setIsSessionActive(true);
      setIsRevising(false);
      speak(words[0]);
    }
  };

  const handleBack = () => {
    stopListening();
    router.push('/SecondYear');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Reading Assistant</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {words.length > 0 && (
        <div style={{ margin: '16px 0', fontSize: '1.2em' }}>
          {words.map((w, i) => (
            <span key={i} style={{
              backgroundColor: i === currentIndex ? 'yellow' : 'transparent',
              fontWeight: i === currentIndex ? 'bold' : 'normal',
              marginRight: 4,
              padding: '0 2px'
            }}>{w}</span>
          ))}
        </div>
      )}

      {!isSessionActive && words.length > 0 && (
        <button onClick={handleStart}>Start Reading</button>
      )}

      <button onClick={handleBack} style={{ marginLeft: 8 }}>Back</button>

      {!isSessionActive && reviseQueue.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Words to Practice Again:</h3>
          <ul>{reviseQueue.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </div>
      )}

      <p style={{ marginTop: 20 }}><strong>Status:</strong> {status}</p>
    </div>
  );
}
