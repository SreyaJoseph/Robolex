let words = document.getElementById("reading-text").innerText.split(" ");
let currentIndex = 0;

function startListening() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function(event) {
        let spokenWord = event.results[0][0].transcript.trim().toLowerCase();
        let correctWord = words[currentIndex].toLowerCase();

        if (spokenWord === correctWord) {
            highlightWord(currentIndex, "green");
            currentIndex++;
        } else {
            highlightWord(currentIndex, "red");
        }

        if (currentIndex < words.length) {
            recognition.start();
        } else {
            playConfetti();
        }
    };

    recognition.start();
}

function highlightWord(index, color) {
    let textContainer = document.getElementById("reading-text");
    let updatedText = words.map((word, i) => 
        i === index ? `<span style="color:${color};">${word}</span>` : word
    ).join(" ");
    textContainer.innerHTML = updatedText;
}

function playConfetti() {
    confetti.start();
    setTimeout(() => confetti.stop(), 3000);
}
