// Select the elements
const game1Buttons = document.querySelectorAll('#game-1');
const game2Buttons = document.querySelectorAll('#game-2');
const game3Buttons = document.querySelectorAll('#game-3');
const game4Buttons = document.querySelectorAll('#game-4');
const game1Block = document.querySelector('#game-1-block');
const game2Block = document.querySelector('#game-2-block');
const game3Block = document.querySelector('#game-3-block');
const game4Block = document.querySelector('#game-4-block');

// function that shows the game that has been selected, and hides the rest
const showGame1 = () => {
  game1Block.classList.remove('hidden');
  game2Block.classList.add('hidden');
  game3Block.classList.add('hidden');
  game4Block.classList.add('hidden');
};

const showGame2 = () => {
  game2Block.classList.remove('hidden');
  game1Block.classList.add('hidden');
  game3Block.classList.add('hidden');
  game4Block.classList.add('hidden');
};

const showGame3 = () => {
  game3Block.classList.remove('hidden');
  game1Block.classList.add('hidden');
  game2Block.classList.add('hidden');
  game4Block.classList.add('hidden');
};

const showGame4 = () => {
  game4Block.classList.remove('hidden');
  game1Block.classList.add('hidden');
  game2Block.classList.add('hidden');
  game3Block.classList.add('hidden');
};

// event listeners
game1Buttons.forEach(button => {
  button.addEventListener('click', showGame1);
});

game2Buttons.forEach(button => {
  button.addEventListener('click', showGame2);
});

game3Buttons.forEach(button => {
  button.addEventListener('click', showGame3);
});

game4Buttons.forEach(button => {
  button.addEventListener('click', showGame4);
});

// only show game block 1 initially
game1Block.classList.remove('hidden');
game2Block.classList.add('hidden');
game3Block.classList.add('hidden');
game4Block.classList.add('hidden');
