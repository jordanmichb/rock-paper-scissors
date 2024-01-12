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

    switch (computerSelection) {
        case "Rock":
            if (playerSelection == "Rock") { return tie }
            else if (playerSelection == "Paper") { return win}
            else if (playerSelection == "Scissors") { return lose };
        case "Paper":
            if (playerSelection == "Rock") { return lose }
            else if (playerSelection == "Paper") { return tie}
            else if (playerSelection == "Scissors") { return win };
        case "Scissors":
            if (playerSelection == "Rock") { return win }
            else if (playerSelection == "Paper") { return lose}
            else if (playerSelection == "Scissors") { return tie };
    }
    
}