import Game from '../game';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
const mockGameMoveEnemy = jest.spyOn(Game.prototype, 'moveEnemy');

test('An error is thrown if an element with the game-container class is not found', () => {
  document.body.innerHTML = '';
  const game = new Game();
  const container = document.querySelector('.game-container');
  const init = () => game.init(container);
  expect(init).toThrow('HTML container not found!');
});

test('After initialization, N elements with the game-cell class appear, where N is the Game.boardSize squared.', () => {
  document.body.innerHTML = '<div class="game-container"></div>';
  const game = new Game(2);
  const container = document.querySelector('.game-container');
  game.init(container);
  expect(container.innerHTML).toBe('<div class="game-cell"></div>'.repeat(4));
});

test('A game cell with an enemy character can be found by the CSS selector: nth-child(game.currentEnemyCellID + 1)', () => {
  document.body.innerHTML = '<div class="game-container"></div>';
  const game = new Game();
  const container = document.querySelector('.game-container');
  game.init(container);
  game.moveEnemy();
  const cell = document.querySelector(`.game-container > .game-cell:nth-child(${game.currentEnemyCellID + 1})`);
  expect(cell.innerHTML).toBe('<img src="">');
});

test(
  'The run method calls the moveEnemy method for the appearance of an enemy character and sets an interval for changing its position every 2 seconds',
  () => {
    const game = new Game();
    const container = document.querySelector('.game-container');
    game.init(container);
    game.run();
    expect(mockGameMoveEnemy).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 2000);
  },
);
