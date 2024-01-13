const choices = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3); // Randomly choose either 0, 1, or 2
    return choices[computerChoice]; // Return random choice from the list
}

function getPlayerChoice() {
    let choice = prompt("Choose rock, paper, or scissors.");
    
    if (choice != null) {
        // Format player choice so case doesn't matter
        choice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase()
        while (!choices.includes(choice)) {
            choice = prompt("Invalid choice, please try again.");
            if (choice == null) { return choice };
        }
    }

    return choice;
}

function getNumberOfGames() {
    let num = Number(prompt("How many games would you like to play? Enter a positive number."));

    // If number is invalid, continue to promp
    while (isNaN(num) || num < 0) {
        num = Number(prompt("Invalid number, please try again."));
        if (num == 0) { return num }
    }

    return num;
}

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

function game() {
    const numGames = getNumberOfGames();
    // Stop game if player chose "Cancel"
    if (numGames === null || numGames === 0) { return };
    
    let i, playerWins = 0, computerWins = 0, tieGames = 0;

    for (i = 0; i < numGames; i++) {
        const playerChoice = getPlayerChoice();
        // Stop game if player chose "Cancel"
        if (playerChoice === null) { break };
        const computerChoice = getComputerChoice();
        const roundResult = playRound(playerChoice, computerChoice);

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

    console.log(`Games played: ${i}`);
    console.log(`Score:\n\tPlayer: ${playerWins}\n\tComputer: ${computerWins}\n\tTies: ${tieGames}`);

    if (playerWins > computerWins) { console.log("Congratulations! You win the game.") }
    else if (playerWins < computerWins) { console.log("Sorry! You lost the game.") }
    else { console.log("Tie game!") };
}

game();
