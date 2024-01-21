const choices = ["rock", "paper", "scissors"];
let winScore = 5, playerScore = 0, computerScore = 0, tieScore = 0;
let gameRunning = false;

const btn = document.querySelector('#play');
const arena = document.querySelector('.arena');
const numRounds = document.querySelector('#num-rounds');

const playerScoreText = document.querySelector("#player-score");
const tieScoreText = document.querySelector("#tie-score");
const computerScoreText = document.querySelector("#computer-score");

const overlay = document.querySelector('#popup1');
const resetBtn = document.querySelector('#reset');
const popupBtn = document.querySelector('#p-btn1');

resetBtn.addEventListener('click', resetGame);
popupBtn.addEventListener('click', resetGame);

numRounds.oninput = () => {
    console.log(numRounds.value.length)
    console.log(numRounds.value)
    //if (!Number.isInteger(numRounds.value)) { numRounds.value.slice() }
    if (numRounds.value.length > 3) { numRounds.value = numRounds.value.slice(0,3) }
    if (numRounds.value < 1 || numRounds.value > 100) { numRounds.style.border = "2px solid red" }
    else { numRounds.style.border = "1px solid #ccc" }
}

// When a gamepiece is clicked, remove border from all pieces then, add border to selection,
// and updated the selected piece
const pieces = document.querySelectorAll('.choice');
pieces.forEach(piece => {
    piece.addEventListener('click', e => {
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

function resetGame() {
    overlay.style.opacity = 0;
    overlay.style.visibility = "hidden";
    numRounds.removeAttribute('disabled');
    numRounds.style.border = "1px solid #ccc"
    numRounds.value = "5";
    pieces.forEach(piece => {
        piece.classList.remove('selected');
    })
    playerScore = 0;
    winScore = 5;
    tieScore = 0;
    computerScore = 0;
    playerScoreText.textContent = 0;
    tieScoreText.textContent = 0;
    computerScoreText.textContent = 0;

    document.querySelector('#player-piece').setAttribute('src', './images/blank.png');
    document.querySelector('#computer-piece').setAttribute('src', './images/blank.png');
}

function getComputerChoice() {
    // Return random choice from the list by selecting choices[1] [2] or [3]
    return choices[Math.floor(Math.random() * 3)]; 
}

function showPopup() {
    overlay.style.opacity = 1;
    overlay.style.visibility = "visible";
}

function checkGameIsOver() {
    if (playerScore >= winScore || computerScore >= winScore) {
        numRounds.removeAttribute('disabled');

        if (playerScore > computerScore) { 
            document.querySelector("#p-head1").textContent = "Congratulations!";
            document.querySelector("#p-text1").textContent =  "You have won Rock, Paper, Scissors!"
        }
        else if (computerScore > playerScore) { 
            document.querySelector("#p-head1").textContent = "Sorry!";
            document.querySelector("#p-text1").textContent =  "You lost this one. Would you like to try again?"
        }
        

        showPopup();
    } 
}

function updateScore(playerChoice, computerChoice) {
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
    playerScoreText.textContent = playerScore;
    tieScoreText.textContent = tieScore;
    computerScoreText.textContent = computerScore;
}

// Cycles through all choices in a roulette, then randomly selects computer's choice
// If cycle is finished, make computer choice and resolve. If not, return updated values
// so cycle can continue.
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

function playRound() {
    let playerChoice = '';

    // Find selected piece and set as player's choice
    pieces.forEach(piece => {
        if (piece.classList.contains('selected')) {
            playerChoice = piece.id;
        }
    });

    if (playerChoice) {
        numRounds.setAttribute('disabled', 'true');
        // Get rid of last round's pieces
        document.querySelectorAll(".in-play").forEach(el => arena.removeChild(el));
        
        // Place player's chosen piece in arena
        const player = document.createElement('img');
        player.setAttribute('src', `./images/${playerChoice}.png`);
        player.setAttribute('id', 'player-piece');
        player.classList.add('piece');
        player.classList.add('in-play');
        if (playerChoice === "paper") player.classList.add('paper');
        arena.appendChild(player);
    
        // Place computer's initial piece in arena
        const computer = document.createElement('img');
        computer.setAttribute('src', './images/rock.png');
        computer.setAttribute('id', 'computer-piece');
        computer.classList.add('piece');
        computer.classList.add('in-play');
        arena.appendChild(computer);
       
        // Cycle through choices as a roulette, then choose a piece for computer.
        // This will try and fulfill cycleAndChoose promise. Continue trying until resolved, at
        // which point the computer's choice has been made and the game can be scored. If rejected,
        // continue the cycle with updated values.
        const cycle = (computer, i = 0, cycles = 0) => {
            cycleAndChoose(computer, i, cycles).then(computerChoice => {
                // Paper has different padding
                if (computerChoice === "paper") computer.classList.add('paper');
                // Allow resetting and respinning now that round is over
                btn.removeAttribute('disabled');
                resetBtn.removeAttribute('disabled');

                updateScore(playerChoice, computerChoice);
                checkGameIsOver();
            }).catch((vals) => { 
                cycle(computer, vals[0], vals[1]) 
            });
        }
        cycle(computer);
    }
}

btn.addEventListener('click', () => {
    //if (!gameRunning) playRound();
    winScore = numRounds.value;
    if (winScore > 0 && winScore < 101 && winScore % 1 === 0) {
        // Disallow resetting or spinning again until round is over
        btn.setAttribute('disabled', 'true');
        resetBtn.setAttribute('disabled', 'true');
        playRound();
    }
});
