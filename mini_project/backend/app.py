from flask import Flask, request, jsonify
import ollama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

# System instruction for the chatbot
SYSTEM_PROMPT = """
You are an expert in dyslexia. Your job is to help parents understand dyslexia,
provide learning strategies, suggest supportive resources, and answer common questions
about dyslexic students. Provide factual, easy-to-understand response.
"""
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Dyslexia Chatbot API is running!"})


@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({'response': 'No message provided'}), 400

        # Generate response using Ollama's Mistral model
        response = generate_response(user_input)
        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_response(user_input):
    """
    Generates a response using Ollama's Mistral model with a dyslexia-specific prompt.
    """
    try:
        response = ollama.chat(
            model="mistral",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_input}
            ]
        )
        return response["message"]["content"]
    except Exception as e:
        return f"An error occurred while generating a response: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
