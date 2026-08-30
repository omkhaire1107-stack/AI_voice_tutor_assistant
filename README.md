# 🎙️ AI Voice Language Tutor

An AI-powered voice language tutor that helps learners improve their grammar and vocabulary through spoken conversations.

The application allows a learner to speak a sentence, converts the speech into text, analyzes it using Google's Gemini API, provides grammar and vocabulary feedback, generates a corrected sentence, and reads the correction back using text-to-speech.

---

## 🚀 Features

- 🎤 Voice-based language input
- 📝 Speech-to-text conversion
- 🧠 AI-powered grammar analysis
- 📚 Vocabulary feedback
- ✏️ Corrected sentence generation
- 🔊 Text-to-speech for corrected sentences
- 🌐 Multiple target language options
- 📊 Basic learner progress tracking
- 🎯 Basic adaptive difficulty levels
- 💾 Local progress storage using browser localStorage

---

## 🏗️ System Architecture

```text
User
  │
  ▼
🎤 Microphone
  │
  ▼
Web Speech API
  │
  ▼
Speech-to-Text
  │
  ▼
FastAPI Backend
  │
  ▼
Gemini API
  │
  ├── Grammar Analysis
  ├── Vocabulary Feedback
  ├── Correction
  └── Explanation
  │
  ▼
Frontend
  │
  ▼
🔊 Text-to-Speech

🛠️ Technologies Used

### Frontend

HTML
CSS
JavaScript
Web Speech API
Browser SpeechSynthesis API

### Backend

Python
FastAPI
Uvicorn

### AI

Google Gemini API
Gemini Flash model

### Storage

Browser localStorage
## 📁 Project Structure
AI_voice_tutor_assistant/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── .gitignore
├── .env.example
└── README.md

## ⚙️ Setup

1. Clone the repository
git clone https://github.com/omkhaire1107-stack/AI_voice_tutor_assistant.git
2. Open the project
cd AI_voice_tutor_assistant
3. Install Python dependencies
pip install fastapi uvicorn google-genai python-dotenv pydantic
4. Create a .env file

Create a file named:

.env

Add your Gemini API key:

GEMINI_API_KEY=your_api_key_here

Do not upload the .env file to GitHub.

5. Start the backend
uvicorn backend.main:app --reload

The backend will run at:

http://127.0.0.1:8000
6. Open the frontend

Open:

frontend/index.html

in Google Chrome.

Allow microphone access when prompted.

## 🧪 Example

Learner says:

I go to market yesterday.

AI feedback:

The system identifies the grammar issue and provides a corrected sentence.

Corrected sentence:

I went to the market yesterday.

The application can then read the corrected sentence aloud.

## 📊 Progress Tracking

The application keeps basic learner statistics in browser localStorage.

Currently tracked:

Practice sessions
Grammar mistakes
Vocabulary issues
Correct sessions
Current difficulty level

No external database is required for the current version.

## 🤖 Use of AI During Development

AI tools were used as development assistance during this project.

AI assistance was used for:

Understanding implementation approaches
Generating and refining code
Debugging development errors
Understanding API integration
Improving the application structure
Troubleshooting issues during development

The project was developed iteratively, with the implementation being tested and verified locally after each major step.

The application itself also uses the Google Gemini API as its language-analysis component.

## 🎯 Project Objective

The objective of this project is to demonstrate how voice interfaces and generative AI can be combined to create an interactive language-learning assistant.

Instead of requiring learners to type their sentences, the system allows them to practice through speech and receive immediate AI-generated feedback.

## 🔮 Future Improvements

Possible future improvements include:

Conversation mode with the AI tutor
More accurate learner-level assessment
Personalized lesson generation
Detailed progress dashboard
Persistent database-based learner profiles
Pronunciation analysis
More languages
Difficulty adaptation based on long-term performance

## 👨‍💻 Author

Omkar Khaire

Built as an AI/voice-based language learning project.
