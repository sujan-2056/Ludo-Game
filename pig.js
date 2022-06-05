'use strict';

// alert('this is alert');
const player0Ele = document.querySelector('.player-0');
const player1Ele = document.querySelector('.player-1');
const score0Ele =  document.getElementById('score-0');
const score1Ele = document.getElementById('score-1');
const crtScore0 = document.getElementById('current-score-0');
const crtScore1 = document.getElementById('current-score-1');


const btnNewGame = document.querySelector('.new');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');
const diceImg = document.querySelector('.dice');

let playing, currentScore, activePlayer, scoresInArr;

// Starting Conditions
const init = function() {
    playing = true;
    currentScore = 0; 
    activePlayer = 0;
    scoresInArr = [0, 0];

    score0Ele.textContent = 0;
    score1Ele.textContent = 0;
    crtScore0.textContent = 0;
    crtScore1.textContent = 0;

    diceImg.classList.add('hidden');
    player0Ele.classList.remove('playerWinner');
    player1Ele.classList.remove('playerWinner');
    player0Ele.classList.add('active-players');
    player1Ele.classList.remove('active-players');
}
init();

// Function For SwitchPlayer
function switchPlayers() {
    document.getElementById(`current-score-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Ele.classList.toggle('active-players');
    player1Ele.classList.toggle('active-players');
}

// Rolling Dices Functionality
btnRoll.addEventListener('click', function(){
    if(playing) {
                //roll random number
        const dices =  Math.trunc (Math.random() * 6) + 1;

                //Display it
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${dices}.png`;

                //Checked for rolled number 1
        if( dices !== 1){
                //Add to current score
            currentScore += dices;
            document.getElementById(`current-score-${activePlayer}`).textContent = currentScore;
        }else{
                //Switch to next user
            switchPlayers();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
            // Add score in total score by adding with current score
        scoresInArr[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scoresInArr[activePlayer];

            // When player get more than 100 points
        if(scoresInArr[activePlayer] >= 100) {
            playing = false;
            diceImg.classList.add('hidden');
            
            document.querySelector( `.player-${activePlayer}`).classList.add('playerWinner');

            document.querySelector(`.player-${activePlayer}`).classList.remove('active-players');
        }else{
                //Switch to next user
            switchPlayers();
        }
    }
});

// New Game Button where init function is called.
btnNewGame.addEventListener('click', init );
