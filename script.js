const choices = ["rock", "paper", "scissors"];
let gameRunning = false;

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3); // Randomly choose either 0, 1, or 2
    return choices[computerChoice]; // Return random choice from the list
}

function getPlayerChoice() {
    let choice = prompt("Choose rock, paper, or scissors.");

    if (choice === null) { return choice };  // Prompt was cancelled

    choice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();

    while (!choices.includes(choice)) {
        choice = prompt("Invalid choice, please try again.");
        if (choice == null) { return choice };
        choice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();
    }
    
    return choice;
}

function getGamesToWin() {
    let num = Number(prompt("What will the winning score be? Enter a positive number."));

    // If number is invalid, continue to promp
    while (isNaN(num) || num < 0) {
        num = Number(prompt("Invalid number, please try again."));
        if (num == 0) { return num }; // Prompt was cancelled
    }

    return num;
}
/*
function playRound(playerChoice, computerChoice) {
    const tie = "tie";
    const win = "win";
    const lose = "lose";

    console.log(`You chose ${playerChoice}.`);
    console.log(`The computer chose ${computerChoice}.`);

    switch (playerChoice) {
        case "Rock":
            if (computerChoice == "Rock") { return tie }
            else if (computerChoice == "Paper") { return lose}
            else if (computerChoice == "Scissors") { return win };
        case "Paper":
            if (computerChoice == "Rock") { return win }
            else if (computerChoice == "Paper") { return tie}
            else if (computerChoice == "Scissors") { return lose };
        case "Scissors":
            if (computerChoice == "Rock") { return lose }
            else if (computerChoice == "Paper") { return win}
            else if (computerChoice == "Scissors") { return tie };
        default:
            return;
    }
}
*/
function game() {
    const winScore = getGamesToWin();
    if (winScore === null || winScore === 0) { return }; // Stop game if player chose "Cancel"
    
    let totalGames = 0, playerWins = 0, computerWins = 0, tieGames = 0;

    while (playerWins < winScore && computerWins < winScore) {

        const playerChoice = getPlayerChoice();
        if (playerChoice === null) { break }; // Stop game if player chose "Cancel" in prompt box

        const computerChoice = getComputerChoice();

        const roundResult = playRound(playerChoice, computerChoice);
        totalGames++;

        switch (roundResult) {
            case "win":
                console.log(`Round won! Your ${playerChoice} beats the computer's ${computerChoice}.`);
                console.log("");
                playerWins++;
                break;
            case "lose":
                console.log(`Round lost! The computer's ${computerChoice} beats your ${playerChoice}.`);
                console.log("");
                computerWins++;
                break;
            case "tie":
                console.log("Round tied!");
                console.log("");
                tieGames++;
                break;
            default:
                break;
        }
    }

    console.log(`Games played: ${totalGames}`);
    console.log(`Score:\n\tPlayer: ${playerWins}\n\tComputer: ${computerWins}\n\tTies: ${tieGames}`);

    if (playerWins > computerWins) { console.log("Congratulations! You win the game.") }
    else if (playerWins < computerWins) { console.log("Sorry! You lost the game.") }
    else { console.log("Tie game!") };
}

// When a gamepiece is clicked, remove border from all pieces then, add border to selection,
// and updated the selected piece
const pieces = document.querySelectorAll('.piece');
pieces.forEach(piece => {
    piece.addEventListener('click', (e) => {
        // Remove border if clicked piece is already selected
        if (e.target.classList.contains('selected')) { 
            e.target.classList.toggle('selected');
            selected = '';
        }
        else {
            pieces.forEach(piece => {
                piece.classList.remove('selected');
            })
            e.target.classList.toggle('selected');
            selected = e.target.id;
        };
    });
});

//
function cycleAndChoose(element, idx = 0, cycles = 0) {
    if (cycles >= 30) {
        const choice = getComputerChoice();
        element.setAttribute('src', `./images/${choice}.png`);
        gameRunning = false;
        return;
    }
    gameRunning = true;
    element.setAttribute('src', `./images/${choices[idx]}.png`);
    idx = idx === choices.length - 1 ? 0 : ++idx;
    cycles++;
    setTimeout(cycleAndChoose, 50, element, idx, cycles);
}

function playRound() {
    let selected = '';
    pieces.forEach(piece => {
        if (piece.classList.contains('selected')) {
            selected = piece.id;
        }
    });

    if (selected) {
        document.querySelectorAll(".in-play").forEach((el) => arena.removeChild(el));
        const player = document.createElement('img');
        player.setAttribute('src', `./images/${selected}.png`);
        player.classList.add('piece');
        player.classList.add('in-play');
        arena.appendChild(player);
        
        const computer = document.createElement('img');
        computer.setAttribute('src', './images/rock.png');
        computer.classList.add('piece');
        computer.classList.add('in-play');
        arena.appendChild(computer);

        cycleAndChoose(computer);
    }

}

const btn = document.querySelector('#play');
const arena = document.querySelector('.arena');
btn.addEventListener('click', () => {
    if (!gameRunning) playRound();
});

//game();
