import Game from './game';

const game = new Game();

document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.querySelector('.game-container');
  game.init(gameContainer);
  game.run();
});
