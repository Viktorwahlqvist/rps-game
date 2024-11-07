// Get elements for each choice (bag, rock, scissors)
const inputBag = document.getElementById("bag");
const inputRock = document.getElementById("rock");
const inputScissors = document.getElementById("scissors");

// Get the paragraph element to display results
const resultsParagraph = document.getElementById("results");
const gameInfo = document.getElementById("gameInfo");
const scoreInfo = document.getElementById("scoreInfo");
const startGame = document.getElementById("startGame");
const chooseGames = document.getElementById("chooseGames");
const sectionContainer = document.getElementById("sectionContainer");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const compputerScoreDisplay = document.getElementById("computerScoreDisplay");
const bestOfGames = document.getElementById("bestOfGames");
const gameInfoDisplay = document.getElementById("gameInfoDisplay");

startGame.disabled = true;
let isStarted = false;
let gameRounds = 0;
let playerScore = 0;
let computerScore = 0;
let bestOfGamesInt = 0;
let gameOver = false;

console.log();

// Hide the section initially
sectionContainer.classList.add("HideSection");

// Listen for changes in the "bestOfGames" dropdown
bestOfGames.addEventListener('change', validOption);

// Function to enable/disable the "startGame" button
function validOption(){
    const selectedValue = bestOfGames.value;
      // Enable startGame button if value is 3 or 5
    if(selectedValue == 3 || selectedValue == 5){
        startGame.disabled = false;
    } else {
        // Disable startGame button if other value is selected
        startGame.disabled = true;
    }
}

// Start game button event
startGame.addEventListener('click', myClick);

function myClick() {
    bestOfGames.classList.add("Hide");
    chooseGames.classList.add("Hide");
    startGame.classList.add("Hide");
    resultsParagraph.classList.add("Hide");
    scoreInfo.textContent = "";
    gameRounds = 0;
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    isStarted = true;
    if (isStarted) {
        sectionContainer.classList.remove("HideSection");
    }
}

// Reset game state
function resetMyClick() {
    bestOfGames.classList.remove("Hide");
    chooseGames.classList.remove("Hide");
    startGame.classList.remove("Hide");
    resultsParagraph.classList.remove("Hide");
    sectionContainer.classList.add("HideSection");


    // Reset game state
    gameInfo.textContent = "";
    gameInfoDisplay.textContent = "";
    resultsParagraph.textContent = "";
    gameOver = false;
}

// Update the game info and call the game function
function updateGameInfo(playerChoice, choice) {
    gameInfoDisplay.textContent = playerChoice;
    bagRockScissors(choice, generateComputerChoice());
}

// Update number of games selected
bestOfGames.addEventListener('input', () => {
    bestOfGamesInt = parseInt(bestOfGames.value);
    console.log(bestOfGamesInt); // Debug
    gameRounds = 0; // Reset if player changes games
    resultsParagraph.textContent = "You changed the number of games, hit start game!";
    scoreInfo.textContent = "";
    gameInfo.textContent = "";
    playerScore = 0; // Reset player score
    computerScore = 0; // Reset computer score
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
});

// Handle player choices
inputBag.addEventListener('click', () => {
    if (gameRounds < bestOfGamesInt && !gameOver) {
        updateGameInfo("You clicked Bag!", "bag");
    }
});

inputRock.addEventListener('click', () => {
    if (gameRounds < bestOfGamesInt && !gameOver) {
        updateGameInfo("You clicked Rock!", "rock");
    }
});

inputScissors.addEventListener('click', () => {
    if (gameRounds < bestOfGamesInt && !gameOver) {
        updateGameInfo("You clicked Scissors!", "scissors");
    }
});

// Function to randomly choose for the computer
function generateComputerChoice() {
    const computerChoice = ["bag", "rock", "scissors"];
    const randomIndex = Math.floor(Math.random() * computerChoice.length);
    return computerChoice[randomIndex];
}

// Function to determine the game result based on user and computer choices
function bagRockScissors(userInput, computer) {
    if (userInput === computer) {
        gameInfoDisplay.textContent = "It's a tie!";
    } else if (
        (userInput === "bag" && computer === "rock") ||
        (userInput === "rock" && computer === "scissors") ||
        (userInput === "scissors" && computer === "bag")
    ) {
        gameInfoDisplay.textContent = "You won! You chose " + userInput + " and the computer chose " + computer;
        gameRounds++;
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
    } else {
        gameInfoDisplay.textContent = "The computer won! The computer chose " + computer + " and you chose " + userInput;
        gameRounds++;
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }

    // Check if the game is over
    if (gameRounds >= bestOfGamesInt) {
        gameOver = true; // Set gameOver flag
        gameInfo.textContent = "You reached " + bestOfGamesInt + " rounds.";
        if (playerScore < computerScore) {
            scoreInfo.classList.add("redText");
            scoreInfo.textContent = "Computer won!"

        } else {
            scoreInfo.classList.add("greenText");
            scoreInfo.textContent = "Player Won!"
        }
        resetMyClick(); // Reset the game for another round
    }
}
