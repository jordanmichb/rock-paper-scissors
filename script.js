const choices = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3); // Randomly choose either 0, 1, or 2
    return choices[computerChoice]; // Return random choice from the list
}

function getPlayerChoice() {
    const choice = prompt("Choose rock, paper, or scissors.");
    choice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();
    return choices.includes(choice) ? choice
                                    : "Invalid input."
}

function getNumberOfGames() {
    const num = Number(prompt("How many games would you like to play? Enter a positive number."));
    return isNaN(num) || num < 1 ? "Invalid number." 
                                 : num;
}

function playRound(playerSelection, computerSelection) {
    // Format playerSelection so case doesn't matter
    const tie = "Tie!";
    const win = `You win! Your ${playerSelection} beats the computer's ${computerSelection}.`;
    const lose = `You lose! The computer's ${computerSelection} beats your ${playerSelection}.`;

    console.log(`You chose ${playerSelection}.`);
    console.log(`The computer chose ${computerSelection}.`);

    switch (playerSelection) {
        case "Rock":
            if (computerSelection == "Rock") { return tie }
            else if (computerSelection == "Paper") { return lose}
            else if (computerSelection == "Scissors") { return win };
        case "Paper":
            if (computerSelection == "Rock") { return win }
            else if (computerSelection == "Paper") { return tie}
            else if (computerSelection == "Scissors") { return lose };
        case "Scissors":
            if (computerSelection == "Rock") { return lose }
            else if (computerSelection == "Paper") { return win}
            else if (computerSelection == "Scissors") { return tie };
        default:
            return;
    }
}

/*
function game() {
    const num = getNumberOfGames();
    
    for (let i = 0; i < 5; i++) {
        playRound();
    }
}

game();
*/