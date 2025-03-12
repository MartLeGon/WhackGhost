const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let score = 0;
let time = 0;
let ghostCount = 0;
let gameInterval;
let timerInterval;
let gameOverFlag = false;
let spawnRate = 1000; // 1 second por aparicion

function startGame() {
    gameOverFlag = false;
    gameInterval = setInterval(spawnGhost, spawnRate);
    timerInterval = setInterval(() => {
        time++;
        timerDisplay.textContent = time;

        if (time % 60 === 0) {
            increaseDifficulty();
        }

    }, 1000);
}

function spawnGhost() {
    if (ghostCount >= 20) {
        gameOver();
        return;
    }

    const ghost = document.createElement("div");
    ghost.classList.add("ghost");

    let ghostType = Math.random();
    
    if (ghostType < 0.7) {
        ghost.classList.add("normal-ghost"); // 70% chance
        ghost.dataset.points = "1";
    } else if (ghostType < 0.9) {
        ghost.classList.add("cursed-ghost"); // 20% chance
        ghost.dataset.points = "-2";

        setTimeout(() => {
            if (ghost.parentElement) {
                ghost.remove();
                ghostCount--;
            }
        }, 2000);
    } else {
        ghost.classList.add("golden-ghost"); // 10% chance
        ghost.dataset.points = "5";
    }

    ghost.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
    ghost.style.top = Math.random() * (gameArea.clientHeight - 50) + "px";
    ghost.style.transform = `rotate(${Math.random() * 360}deg)`;

    ghost.addEventListener("click", (event) => {
        if (gameOverFlag) return;
        score += parseInt(ghost.dataset.points);
        scoreDisplay.textContent = score;
        ghost.remove();
        ghostCount--;
    });

    gameArea.appendChild(ghost);
    ghostCount++;
}

// Incrementar la dificultad!!!
function increaseDifficulty() {
    spawnRate *= 0.9;
    clearInterval(gameInterval);
    gameInterval = setInterval(spawnGhost, spawnRate);
}

// GAME OVER
function gameOver() {
    if (gameOverFlag) return;
    gameOverFlag = true;

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    alert("Game Over! Aguantaste " + time + " segundos y ganaste " + score + " puntos.");
    gameArea.innerHTML = "";
}

startGame();