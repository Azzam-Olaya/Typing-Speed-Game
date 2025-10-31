const levelButtons = document.querySelectorAll(".level");
const startButton = document.getElementById("startGame");
const levelSection = document.getElementById("level-section");
const gameSection = document.getElementById("game-section");

let selectedLevel = null;

const textsByLevel = {
    1: "La programmation est un art fascinant. Elle permet de résoudre des problèmes grâce à la logique et à la créativité.",
    2: "Apprendre le JavaScript est une étape importante pour devenir développeur web. Ce langage rend les pages dynamiques et interactives. La programmation est un art fascinant. Elle permet de résoudre des problèmes grâce à la logique et à la créativité.",
    3: "Les développeurs doivent écrire un code clair et organisé. Cela facilite la maintenance et la collaboration dans les projets complexes. La programmation est un art fascinant. Elle permet de résoudre des problèmes grâce à la logique et à la créativité.",
    4: "La technologie évolue rapidement, obligeant chacun à apprendre en permanence. Le partage de connaissances et la curiosité sont les clés de la réussite dans ce domaine passionnant. La programmation est un art fascinant. Elle permet de résoudre des problèmes grâce à la logique et à la créativité."
};

const timeByLevel = {
    1: 60,
    2: 60,
    3: 80,
    4: 100
};

let timerInterval;

levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        levelButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedLevel = button.dataset.level;
    });
});

startButton.addEventListener("click", () => {
    if (selectedLevel == null) {
        alert("Veuillez choisir un niveau avant de commencer !");
        return;
    }

    const gameText = textsByLevel[selectedLevel];
    const timeLimit = timeByLevel[selectedLevel];

    levelSection.classList.add("hidden");
    gameSection.classList.remove("hidden");

    gameSection.innerHTML = `
        <h1>Typing Speed Game</h1>
        <h2>Niveau ${selectedLevel}</h2>

        <div class="text-card">
            <p id="textToType"></p>
        </div>

        <div class="typing-area">
            <p><strong>Votre saisie :</strong></p>
            <textarea id="userInput" placeholder="Écrivez ici le texte ci-dessus..."></textarea>
        </div>

        <div class="info">
            <div>⏰ Temps : <span id="timer">${timeLimit}</span> s</div>
            <div>✅ Mots corrects : <span id="correctCount">0</span></div>
            <div>❌ Erreurs : <span id="errorCount">0</span></div>
        </div>

        <div class="buttons">
            <button id="backBtn">Retour</button>
            <button id="restartBtn">Rejouer</button>
        </div>
    `;


    const textContainer = document.getElementById("textToType");
    textContainer.innerHTML = "";
    for (let char of gameText) {
        const span = document.createElement("span");
        span.textContent = char;
        textContainer.appendChild(span);
    }

    startTimer(timeLimit);
    handleTyping(gameText);

    document.getElementById("backBtn").addEventListener("click", () => {
        clearInterval(timerInterval);
        gameSection.classList.add("hidden");
        levelSection.classList.remove("hidden");
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
        clearInterval(timerInterval);
        startButton.click(); 
    });
});

function startTimer(timeLimit) {
    const timerDisplay = document.getElementById("timer");
    let timeLeft = timeLimit;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function handleTyping(targetText) {
    const input = document.getElementById("userInput");
    const correctCount = document.getElementById("correctCount");
    const errorCount = document.getElementById("errorCount");
    const textSpans = document.querySelectorAll("#textToType span");

    input.addEventListener("input", () => {
        const typedText = input.value;
        let correct = 0;
        let errors = 0;

        for (let i = 0; i < textSpans.length; i++) {
            const typedChar = typedText[i];
            const correctChar = targetText[i];
            const span = textSpans[i];

            if (typedChar == null) {
                span.classList.remove("correct", "incorrect");
            } else if (typedChar === correctChar) {
                span.classList.add("correct");
                span.classList.remove("incorrect");
                correct++;
            } else {
                span.classList.add("incorrect");
                span.classList.remove("correct");
                errors++;
            }
        }

        correctCount.textContent = correct;
        errorCount.textContent = errors;

        if (typedText === targetText) {
            clearInterval(timerInterval);
            endGame(true);
        }
    });
}

function endGame(success = false) {
    const input = document.getElementById("userInput");
    const correct = parseInt(document.getElementById("correctCount").textContent);
    const errors = parseInt(document.getElementById("errorCount").textContent);
    const totalChars = correct + errors;
    const timeUsed = parseInt(document.getElementById("timer").textContent);
    const totalTime = timeByLevel[selectedLevel];
    const timeElapsed = totalTime - timeUsed;

    const words = correct / 5;
    const wpm = Math.round((words / timeElapsed) * 60);
    const accuracy = totalChars > 0 ? Math.round((correct / totalChars) * 100) : 0;

    input.disabled = true;

    const bestScore = localStorage.getItem("bestWPM") || 0;
    if (wpm > bestScore) localStorage.setItem("bestWPM", wpm);

    const message = document.createElement("div");
    message.style.marginTop = "20px";
    message.innerHTML = `
        <h3 style="color:${success ? '#4CAF50' : '#ff4c4c'};">
            ${success ? "🎉 Bravo !" : "⏳ Temps écoulé !"}<br>
        </h3>
        <p>⏱️ Vitesse/min : <strong>${wpm} WPM</strong></p>
        <p>🎯 Précision : <strong>${accuracy}%</strong></p>
        <p>🏆 Meilleur score : <strong>${localStorage.getItem("bestWPM")} WPM</strong></p>
    `;
    gameSection.appendChild(message);
}

