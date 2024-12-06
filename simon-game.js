const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let level = 0;

// DOM elements
const boxes = document.querySelectorAll(".color-box");
const statusText = document.getElementById("status");
const startButton = document.getElementById("start");

// Start game
startButton.addEventListener("click", () => {
    resetGame();
    nextRound();
});

// Reset game state
function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    statusText.textContent = "Watch the sequence!";
}

// Advance to the next round
function nextRound() {
    level++;
    playerSequence = [];
    statusText.textContent = `Level ${level}: Watch the sequence!`;

    // Add a new color to the sequence
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(nextColor);

    // Show the sequence
    let delay = 500;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            playColor(color);
        }, delay * (index + 1));
    });

    // Allow player input after sequence ends
    setTimeout(() => {
        statusText.textContent = "Your turn!";
        enablePlayerInput();
    }, delay * (gameSequence.length + 1));
}

// Play a color (highlight and sound)
function playColor(color) {
    const box = document.getElementById(color);
    box.classList.add("active");
    setTimeout(() => {
        box.classList.remove("active");
    }, 300);
}

// Enable player input
function enablePlayerInput() {
    boxes.forEach(box => {
        box.addEventListener("click", handlePlayerInput);
    });
}

// Disable player input
function disablePlayerInput() {
    boxes.forEach(box => {
        box.removeEventListener("click", handlePlayerInput);
    });
}

// Handle player input
function handlePlayerInput(event) {
    const selectedColor = event.target.id;
    playerSequence.push(selectedColor);
    playColor(selectedColor);

    // Check player's input against the game sequence
    if (!isCorrectInput()) {
        statusText.textContent = "Wrong sequence! Game over.";
        disablePlayerInput();
        return;
    }

    // Check if the player completed the sequence
    if (playerSequence.length === gameSequence.length) {
        disablePlayerInput();
        statusText.textContent = "Good job! Next level.";
        setTimeout(nextRound, 1000);
    }
}

// Check if the player's input matches the game sequence so far
function isCorrectInput() {
    return playerSequence.every((color, index) => color === gameSequence[index]);
}
