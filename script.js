let sequence = [];
let playerSequence = [];
let colors = ["green", "red", "yellow", "blue"];
let level = 0;
let started = false;

document.getElementById("start").addEventListener("click", startGame);
document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", handleClick));

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    started = true;
    document.querySelector("h3").textContent = "Get Ready!";
    nextLevel();
}

function nextLevel() {
    playerSequence = [];
    level++;
    document.querySelector("h3").textContent = `Level ${level}`;
    let randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let delay = 600;
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, delay * (index + 1));
    });
}

function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 300);
}



function handleClick() {
    if (!started) return;
    let color = this.id;
    playerSequence.push(color);
    flashButton(color);
    checkAnswer(playerSequence.length - 1);
}

function checkAnswer(index) {
    if (playerSequence[index] !== sequence[index]) {
        document.querySelector("h3").textContent = "Game Over! Press Start to Retry";
        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 300);
        started = false;
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}
