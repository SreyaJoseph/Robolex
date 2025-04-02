from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from process_text import extract_text, analyze_pronunciation

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    text = extract_text(filepath)
    return jsonify({'text': text})

@app.route('/analyze_audio', methods=['POST'])
def analyze_audio():
    audio_file = request.files['audio']
    result = analyze_pronunciation(audio_file)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
