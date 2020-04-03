/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Making variables to keep score of the game

let score = [0, 0];
let roundScore = 0;
let activePlayer = 0;

// Removing the dice from the site
let diceDom = document.querySelector(`.dice`);
diceDom.style.display = 'none';

// Setting the initial values to 0
document.querySelector(`#score-0`).textContent = 0;
document.querySelector(`#current-0`).textContent = 0;
document.querySelector(`#score-1`).textContent = 0;
document.querySelector(`#current-1`).textContent = 0;

document.querySelector(`.btn-roll`).addEventListener('click', () => {
  // Random number
  const dice = Math.floor(Math.random() * 6) + 1;

  // Display the number
  diceDom.style.display = 'block';
  diceDom.src = `dice-${dice}.png`

  // Update the roundScore if the number was NOT a 1
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    // if active === 0 => activePlayer = 1 else activePlayer = 0
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector(`.player-0-panel`).classList.toggle(`active`);
    document.querySelector(`.player-1-panel`).classList.toggle(`active`);

    diceDom.src = `icon.png`;

    // if (activePlayer === 0) {
    //   document.querySelector(`.player-0-panel`).classList.remove(`active`);
    //   document.querySelector(`.player-1-panel`).classList.add(`active`);
    // } else {
    //   document.querySelector(`.player-1-panel`).classList.remove(`active`);
    //   document.querySelector(`.player-0-panel`).classList.add(`active`);
    // }
  }
});


// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em> ${dice} <em>`;  // Score in Italic
// const x = document.querySelector(`#score-0`).textContent; // Getter (just to see)