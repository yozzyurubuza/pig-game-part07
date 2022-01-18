'use strict';

// Selecting elements
//For classes
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
//For IDs, works fastter than querySelector
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function () {
  scores = [0, 0]; //Final Scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Add or Remove ClassList will not add/remove it if it's already there / not there.
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //Switch to next player

  //1. Reset current score to 0 and display
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  //2. Change color to active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

//Own implementation
/*
btnNew.addEventListener('click', function () {
  //Reset Scores = Current score, Scores[0,1],
  currentScore = 0;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.getElementById(`current--${i}`).textContent = scores[i];
    document.getElementById(`score--${i}`).textContent = scores[i];
  }

  //Reset turn to player 1,
  //If no winner
  diceEl.classList.add('hidden');
  if (activePlayer !== 0 && playing) {
    switchPlayer();
  }

  //If there is winner
  else if (!playing) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');

    //Reset playing condition to enable buttons
    playing = true;
  }
});
*/

//Jonas Schmedtmann Implementation - Reset Button

btnNew.addEventListener('click', init);
