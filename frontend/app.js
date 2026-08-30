let correctSessions = Number(localStorage.getItem("correctSessions")) || 0;
let sessions = Number(localStorage.getItem("sessions")) || 0;
let grammarMistakes = Number(localStorage.getItem("grammarMistakes")) || 0;
let vocabularyIssues = Number(localStorage.getItem("vocabularyIssues")) || 0;

updateProgress();

const micButton = document.getElementById("micButton");
const transcript = document.getElementById("transcript");
const feedback = document.getElementById("feedback");
const corrected = document.getElementById("corrected");
const language = document.getElementById("language");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Please use Google Chrome for speech recognition.");
} else {
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", () => {
        recognition.lang = getLanguageCode(language.value);

        transcript.textContent = "Listening...";
        micButton.textContent = "🛑 Listening...";

        recognition.start();
    });

    recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;

        transcript.textContent = text;
        micButton.textContent = "🎤 Start Speaking";

        await sendToBackend(text);
    };

    recognition.onerror = (event) => {
        console.error(event.error);
        transcript.textContent = "Could not understand your voice.";
        micButton.textContent = "🎤 Start Speaking";
    };

    recognition.onend = () => {
        micButton.textContent = "🎤 Start Speaking";
    };
}

async function sendToBackend(sentence) {
    feedback.textContent = "Sending to backend...";
    corrected.textContent = "...";

    try {
        const response = await fetch("http://127.0.0.1:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sentence: sentence,
                language: language.value
            })
        });

        const data = await response.json();

        feedback.textContent =
            "Grammar: " + data.grammar +
            "\n\nVocabulary: " + data.vocabulary +
            "\n\nExplanation: " + data.explanation;
        corrected.textContent = data.corrected_sentence;

        sessions++;

        const grammarHasMistake =
            !data.grammar.toLowerCase().includes("no grammar mistakes");

        if (!grammarHasMistake) {
            correctSessions++;
        }

        if (!data.grammar.toLowerCase().includes("no grammar mistakes")) {
            grammarMistakes++;
        }

        if (
            !data.vocabulary.toLowerCase().includes("no vocabulary") &&
            !data.vocabulary.toLowerCase().includes("vocabulary is correct")
        ) {
            vocabularyIssues++;
        }

        localStorage.setItem("sessions", sessions);
        localStorage.setItem("grammarMistakes", grammarMistakes);
        localStorage.setItem("vocabularyIssues", vocabularyIssues);
        localStorage.setItem("correctSessions", correctSessions);

        updateProgress();

        console.log(data);
    } catch (error) {
        console.error(error);
        feedback.textContent = "Could not connect to backend.";
        corrected.textContent = "";
    }
}

function getLanguageCode(language) {
    const languages = {
        English: "en-US",
        Hindi: "hi-IN",
        Spanish: "es-ES",
        French: "fr-FR",
        German: "de-DE"
    };

    return languages[language] || "en-US";
}

const speakButton = document.getElementById("speakButton");

speakButton.addEventListener("click", () => {
    const text = corrected.textContent;

    if (!text || text === "...") {
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = getLanguageCode(language.value);
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});

function updateProgress() {
    document.getElementById("sessions").textContent = sessions;
    document.getElementById("grammarMistakes").textContent = grammarMistakes;
    document.getElementById("vocabularyIssues").textContent = vocabularyIssues;

    updateDifficulty();
}

function updateDifficulty() {
    let difficulty = "Beginner";

    if (sessions >= 6 && correctSessions / sessions >= 0.9) {
        difficulty = "Advanced";
    } else if (sessions >= 3 && correctSessions / sessions >= 0.7) {
        difficulty = "Intermediate";
    }

    document.getElementById("difficulty").textContent = difficulty;
}

document.getElementById("resetButton").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});