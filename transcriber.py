# transcriber.py
import io
import json
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from vosk import Model, KaldiRecognizer
import soundfile as sf

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js app
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Load the Vosk model once
model = Model("models/vosk-model-small-en-us-0.15")

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    data = await file.read()
    try:
        # Read audio data (must be WAV/FLAC or raw PCM)
        audio, sr = sf.read(io.BytesIO(data))
    except Exception:
        raise HTTPException(400, "Invalid audio format")
    if sr != 16000:
        raise HTTPException(400, "Audio must be 16 kHz sample rate")
    rec = KaldiRecognizer(model, sr)
    rec.SetWords(False)

    text = ""
    # Feed in chunks
    for i in range(0, len(audio), 4000):
        chunk = audio[i : i + 4000].tobytes()
        if rec.AcceptWaveform(chunk):
            res = json.loads(rec.Result())
            text += res.get("text", "")
    final = json.loads(rec.FinalResult())
    text += final.get("text", "")

    return {"text": text}
