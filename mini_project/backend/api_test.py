import requests

API_URL = "http://127.0.0.1:11434/api/generate"  # Ensure this is correct

headers = {"Content-Type": "application/json"}
data = {
    "model": "mistral",  
    "prompt": """You are an AI chatbot that specializes in dyslexia-related queries.  
    - Answer in a friendly and informative tone.  
    - Provide actionable advice and real-world examples.  
    - If the user asks for symptoms, provide a detailed list.  
    - If the user asks about treatment, suggest scientifically backed methods.  
    - Keep responses concise yet helpful.  

    User: What are the symptoms of dyslexia?  
    AI: Dyslexia symptoms vary by age. In children, common signs include difficulty recognizing words, problems with spelling, and trouble with reading fluency. Adults may struggle with reading speed, note-taking, and organization.  
    """,
    "stream": False
}


user_input = input("Ask about dyslexia: ")
data["prompt"] += f"\nUser: {user_input}\nAI:"

response = requests.post(API_URL, json=data, headers=headers)
print("🤖 AI Response:\n", response.json()["response"])
