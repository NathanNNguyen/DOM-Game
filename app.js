/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Making variables to keep score of the game
const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // Removing the dice from the site
  document.querySelector(`.dice`).style.display = 'none';

  // Setting the initial values to 0
  document.querySelector(`#score-0`).textContent = 0;
  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#score-1`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;
  document.querySelector(`#name-0`).textContent = `Player 1`;
  document.querySelector(`#name-1`).textContent = `Player 2`;
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.add('active');
};

init();

document.querySelector(`.btn-roll`).addEventListener('click', () => {
  if (gamePlaying) {
    // Random number
    const dice = Math.floor(Math.random() * 6) + 1;

    // Display the number
    const diceDom = document.querySelector(`.dice`);
    diceDom.style.display = 'block';
    diceDom.src = `images/dice-${dice}.png`

    // Update the roundScore if the number was NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
      diceDom.src = `images/icon.png`;
    }
  }
});

document.querySelector(`.btn-hold`).addEventListener('click', () => {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    const diceDom = document.querySelector(`.dice`);
    diceDom.style.display = 'none';

    // Check if player won
    if (scores[activePlayer] >= 10) {
      document.querySelector(`#name-${activePlayer}`).textContent = `Winner!`;
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      diceDom.style.display = 'block';
      diceDom.style.left = '45%'
      diceDom.src = `images/icon-happy.png`;
      diceDom.classList.add('animated');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

const nextPlayer = () => {
  // Next player

  // if active === 0 => activePlayer = 1 else activePlayer = 0
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;
  document.querySelector(`.player-0-panel`).classList.toggle(`active`);
  document.querySelector(`.player-1-panel`).classList.toggle(`active`);

  // if (activePlayer === 0) {
  //   document.querySelector(`.player-0-panel`).classList.remove(`active`);
  //   document.querySelector(`.player-1-panel`).classList.add(`active`);
  // } else {
  //   document.querySelector(`.player-1-panel`).classList.remove(`active`);
  //   document.querySelector(`.player-0-panel`).classList.add(`active`);
  // }
};

document.querySelector(`.btn-new`).addEventListener(`click`, init);

// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em> ${dice} <em>`;  // Score in Italic
// const x = document.querySelector(`#score-0`).textContent; // Getter (just to see)