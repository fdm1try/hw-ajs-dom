import EnemyImage from '../img/goblin.png';

export default class Game {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.currentEnemyCellID = -1;
  }

  init(container) {
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error('HTML container not found!');
    }
    this.container = container;
    this.container.innerHTML = '';
    this.enemyEl = document.createElement('img');
    this.enemyEl.src = EnemyImage;
    this.cells = [];
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const div = document.createElement('div');
      div.classList.add('game-cell');
      this.cells.push(div);
      this.container.appendChild(div);
    }
  }

  moveEnemy() {
    let cellID;
    while (!cellID || cellID === this.currentEnemyCellID) {
      cellID = Math.round(Math.random() * (this.boardSize ** 2 - 1));
    }
    this.currentEnemyCellID = cellID;
    this.cells[cellID].appendChild(this.enemyEl);
  }

  run() {
    this.moveEnemy();
    setInterval(this.moveEnemy.bind(this), 2000);
  }
}
