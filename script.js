const choices = ["rock", "paper", "scissors"];
let winScore = 1, playerScore = 0, computerScore = 0, tieScore = 0;
let gameRunning = false;

function getComputerChoice() {
    // Return random choice from the list by selecting choices[1] [2] or [3]
    return choices[Math.floor(Math.random() * 3)]; 
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
}*/

// When a gamepiece is clicked, remove border from all pieces then, add border to selection,
// and updated the selected piece
const pieces = document.querySelectorAll('.choice');
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

// Cycles through all choices in a roulette, then randomly selescts computer's choice
// Return as promise to ensure this finishes before next step
function cycleAndChoose(element, i, cycles) {
    return new Promise((resolve, reject) => {
        gameRunning = true;
        element.setAttribute('src', `./images/${choices[i]}.png`);
        i = i === choices.length - 1 ? 0 : ++i;
        cycles++;
        if (cycles >= 30) {
            const choice = getComputerChoice();
            element.setAttribute('src', `./images/${choice}.png`);
            gameRunning = false;
            resolve(choice);
        }
        else {
            // Timeout is what gives roulette effect and necessitates promise (asynchronous)
            setTimeout(() => {reject([i, cycles])}, 50);
        }
    });
}

function checkGameIsOver(reset = false) {
    if (reset) {
        
    }
    if (playerScore >= winScore || computerScore >= winScore) {
        numRounds.removeAttribute('disabled');

        const popup = document.querySelector(".overlay");
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
        
        if (computerScore > playerScore) { 
            document.querySelector("#p-head1").textContent = "Sorry!";
            document.querySelector("#p-text1").textContent =  "You lost this one. Would you like to try again?"
        }
        //else if (playerWins < computerWins) { console.log("Sorry! You lost the game.") }
        //else { console.log("Tie game!") };
    }
    
}

function showPopup() {
    
}

function updateScore(playerChoice, computerChoice) {
    const playerScoreText = document.querySelector("#player-score");
    const tieScoreText = document.querySelector("#tie-score");
    const computerScoreText = document.querySelector("#computer-score");

    switch (playerChoice) {
        case "rock":
            if (computerChoice == "rock") { tieScore++ }
            else if (computerChoice == "paper") { computerScore++ }
            else if (computerChoice == "scissors") { playerScore++ };
            break;
        case "paper":
            if (computerChoice == "rock") { playerScore++ }
            else if (computerChoice == "paper") { tieScore++ }
            else if (computerChoice == "scissors") { computerScore++ };
            break;
        case "scissors":
            if (computerChoice == "rock") { computerScore++ }
            else if (computerChoice == "paper") { playerScore++ }
            else if (computerChoice == "scissors") { tieScore++ };
            break;
        default:
            break;
    }

    playerScoreText.textContent = `Player Score: ${playerScore}`;
    tieScoreText.textContent = `Tie Games: ${tieScore}`;
    computerScoreText.textContent = `Computer Score: ${computerScore}`;

}


function playRound() {
    let playerChoice = '';
    console.log(winScore)

    pieces.forEach(piece => {
        if (piece.classList.contains('selected')) {
            playerChoice = piece.id;
        }
    });

    if (playerChoice) {
        numRounds.setAttribute('disabled', 'true');
        // Get rid of last round's pieces
        document.querySelectorAll(".in-play").forEach((el) => arena.removeChild(el));
        
        const player = document.createElement('img');
        player.setAttribute('src', `./images/${playerChoice}.png`);
        player.setAttribute('id', 'player-piece');
        player.classList.add('piece');
        player.classList.add('in-play');
        player.style.marginRight = '7em';
        if (playerChoice === "paper") player.classList.add('paper');
        arena.appendChild(player);

        const computer = document.createElement('img');
        computer.setAttribute('src', './images/rock.png');
        computer.classList.add('piece');
        computer.classList.add('in-play');
        arena.appendChild(computer);
       
        // Try and fulfill cycleAndChoose promise. Continue trying until resolved, at
        // which point the computer's choice has been made and the game can be scored
        const cycle = (computer, i = 0, cycles = 0) => {
            cycleAndChoose(computer, i, cycles).then(computerChoice => {
                if (computerChoice === "paper") computer.classList.add('paper');

                updateScore(playerChoice, computerChoice);
                checkGameIsOver();
                
                
            }).catch((vals) => { 
                cycle(computer, vals[0], vals[1]) 
            });
        }
        cycle(computer);
    }
    btn.removeAttribute('disabled');
    

}

const btn = document.querySelector('#play');
const arena = document.querySelector('.arena');
const numRounds = document.querySelector('#num-rounds');
btn.addEventListener('click', () => {
    //if (!gameRunning) playRound();
    winScore = document.querySelector("#num-rounds").value;
    btn.setAttribute('disabled', 'true');
    playRound();

});

//game();

/*
myInput.oninput = function () {
    if (this.value.length > 2)
        this.value = this.value.slice(0,2); 
}*/
