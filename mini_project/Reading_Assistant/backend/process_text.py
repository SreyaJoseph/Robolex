import pytesseract
import speech_recognition as sr
import os

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text(image_path):
    return pytesseract.image_to_string(image_path)

def analyze_pronunciation(audio_file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio = recognizer.record(source)

    try:
        result = recognizer.recognize_google(audio)
        return {"status": "success", "recognized_text": result}
    except sr.UnknownValueError:
        return {"status": "error", "message": "Could not understand"}
    except sr.RequestError:
        return {"status": "error", "message": "API request failed"}
