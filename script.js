const levelButtons = document.querySelectorAll(".level");
const startButton = document.getElementById("startGame");
const levelSection = document.getElementById("level-section");
const gameSection = document.getElementById("game-section");

let selectedLevel = null; 

levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        levelButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedLevel = button.dataset.level;
    });
});

startButton.addEventListener("click", () => {
    if (!selectedLevel) {
        alert("Veuillez choisir un niveau avant de commencer !");
        return;
    }
    
    levelSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    gameSection.innerHTML = `
        <h1>Typing Speed Game</h1>
        <h2>Niveau choisi : ${selectedLevel}</h2>
        <div class="text-card">
            <p>Commencez à taper ici :</p>
        </div>
        <textarea id="userInput" placeholder="Tapez votre texte ici..."></textarea>
        <div class="buttons">
            <button id="backBtn">Retour</button>
            <button id="restartBtn">Recommencer</button>
        </div>
    `;

    document.getElementById("backBtn").addEventListener("click", () => {
        gameSection.classList.add("hidden");
        levelSection.classList.remove("hidden");
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
        document.getElementById("userInput").value = "";
    });
});
