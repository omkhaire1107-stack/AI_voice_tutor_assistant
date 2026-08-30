import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class LanguageFeedback(BaseModel):
    grammar: str
    vocabulary: str
    corrected_sentence: str
    explanation: str


@app.get("/")
def home():
    return {"message": "AI Voice Language Tutor backend is running"}


@app.post("/analyze")
def analyze(data: dict):
    sentence = data.get("sentence", "")
    language = data.get("language", "English")

    prompt = f"""
You are a friendly language tutor.

Analyze this learner's sentence.

Target language: {language}
Learner sentence: "{sentence}"

Provide:
- grammar mistakes
- vocabulary feedback
- corrected sentence
- a short beginner-friendly explanation

If the sentence is already correct, say that there are no grammar mistakes
and keep the corrected sentence the same.

Do not give extra information.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": LanguageFeedback,
        },
    )

    result = LanguageFeedback.model_validate_json(response.text)

    return result.model_dump()