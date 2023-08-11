import EnemyImage from '../img/goblin.png';

export default class Game {
  static* randomNumberGenerator(from, to) {
    let last = null;
    while (true) {
      const x = Math.ceil(Math.random() * (to - from)) + from;
      if (x !== last) {
        last = x;
        yield x;
      }
    }
  }

  static init() {
    Game.boardSize = Game.boardSize || 4;
    Game.container = document.querySelector('.game-container');
    if (!Game.container) {
      throw new Error('HTML container not found!');
    }
    Game.enemy = document.createElement('img');
    Game.enemy.src = EnemyImage;
    Game.cells = [];
    for (let i = 0; i < Game.boardSize ** 2; i += 1) {
      const div = document.createElement('div');
      div.classList.add('game-cell');
      Game.cells.push(div);
      Game.container.appendChild(div);
    }
    Game.random = Game.randomNumberGenerator(0, (Game.boardSize ** 2) - 1);
    setInterval(Game.moveEnemy, 2000);
  }

  static moveEnemy() {
    const cellID = Game.random.next().value;
    Game.currentCell = cellID;
    Game.cells[cellID].appendChild(Game.enemy);
  }
}
