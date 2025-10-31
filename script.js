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
