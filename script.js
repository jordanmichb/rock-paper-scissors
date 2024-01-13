function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = Math.floor(Math.random() * 3); // Randomly choose either 0, 1, or 2
    return choices[computerChoice]; // Return random choice from the list
}

function playRound(playerSelection, computerSelection) {
    // Format playerSelection so case doesn't matter
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
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
            return "Invalid input.";
    }
}