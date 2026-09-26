const board = document.getElementById("board");

for (let row = 0; row < 6; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let col = 0; col < 6; col++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        rowElement.appendChild(tile);
    }

    board.appendChild(rowElement);
}

let currentRow = 0;
let currentCol = 0;
let boardState = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
];

//answer word bank
const answers = ["GINGER", "PLAGUE", "MOUNTS", "KARATE", "CANADA",
                 "FERRET", "ZOMBIE", "BLOUSE", "OPENER", "QUEUED",
                 "SICKLE", "DREAMS", "WEAPON", "BACKUP", "AMAZED",
                 "VACUUM", "JUGGLE", "THROAT", "PADDLE", "VISION"];

const answer = answers[Math.floor(Math.random() * answers.length)];
 
let gameOver = false;

document.addEventListener("keydown", function(event) {
    if (gameOver) {
        return;
    }

    const key = event.key.toUpperCase();

    //enter letter
    if (/^[A-Z]$/.test(key)) {
        if (currentCol < 6) {
            boardState[currentRow][currentCol] = key;
            updateBoard();
            currentCol++;
        }
    }

    //delete letter
    if (key === "BACKSPACE") {
        if (currentCol > 0) {
            currentCol--;
            boardState[currentRow][currentCol] = "";
            updateBoard();
        }
    }

    //submit guess
    if (key === "ENTER") {
        if (currentCol == 6 && currentRow < 6) {
            const guess = boardState[currentRow].join("");

            checkGuess(guess);
            currentRow++;
            currentCol = 0;
        }
    }
});

function updateBoard() {
    const rows = document.querySelectorAll(".row");

    for (let row = 0; row < 6; row++) {
        
        const tiles = rows[row].querySelectorAll(".tile");

        for (let col = 0; col < 6; col++) {
            
            tiles[col].textContent = boardState[row][col];
        }
    }
}

function checkGuess(guess) {
    const rows = document.querySelectorAll(".row");
    const tiles = rows[currentRow].querySelectorAll(".tile");

    const answerLetters = answer.split("");

    for (let col = 0; col < 6; col++) {
        const guessedLetter = guess[col];

        if (guessedLetter === answer[col]) {
            //correct letter and right position
            tiles[col].classList.add("green");
            //remove letter from answer letters list
            answerLetters[col] = null;
        }
    }
    
    for (let col = 0; col < 6; col++) {
        const guessedLetter = guess[col];

        //if already labelled "green"
        if (guessedLetter === answer[col]) {
            continue;
        }

        const index = answerLetters.indexOf(guessedLetter);

        if (index !== -1 ) {
            //correct letter but wrong position
            tiles[col].classList.add("yellow")
            //remove letter from answer letters list
            answerLetters[index] = null;
        }
        else {
            //letter not in answer
            tiles[col].classList.add("gray")
        }
    }

    let won = true;

    //checks if player won the game
    for (let col = 0; col < 6; col++) {
        if (!tiles[col].classList.contains("green")) {
            won = false;
            break;
        }
    }

    if (won) {
        gameOver = true;
    }
}