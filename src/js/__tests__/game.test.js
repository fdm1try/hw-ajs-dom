import Game from '../game';

test('The random number generator outputs numbers only from the specified range', () => {
  const randomNumbers = Game.randomNumberGenerator(5, 10);
  const numbers = new Array(100).fill(0).map(() => randomNumbers.next().value);
  const result = numbers.filter((value) => value < 5 || value > 10);
  expect(result).toEqual([]);
});

test('An error is thrown if an element with the game-container class is not found', () => {
  document.body.innerHTML = '';
  expect(Game.init).toThrow('HTML container not found!');
});

test('After initialization, N elements with the game-cell class appear, where N is the Game.boardSize squared.', () => {
  Game.boardSize = 2;
  document.body.innerHTML = '<div class="game-container"></div>';
  const container = document.querySelector('.game-container');
  Game.init();
  expect(container.innerHTML).toBe('<div class="game-cell"></div>'.repeat(4));
});

test('A game cell with an enemy character can be found by the CSS selector: .game-cell:nth-child(Game.currentCell + 1)', () => {
  document.body.innerHTML = '<div class="game-container"></div>';
  Game.init();
  Game.moveEnemy();
  const cell = document.querySelector(`.game-container > .game-cell:nth-child(${Game.currentCell + 1})`);
  expect(cell.innerHTML).toBe('<img src="">');
});
