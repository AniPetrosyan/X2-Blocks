import { Ball } from "../board/ball";
import { Cell } from "../board/cell";
import { EVENTS } from "../events";

export class NextBallsComponent extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._cells = [];
    this._build();
    this._makeBalls();
  }

  _build() {
    this._buildBg();
  }

  _buildBg() {
    for (let i = 0; i < 3; i++) {
      const cell = new Cell(this.scene, 0, i);
      this._cells.push(cell);
      cell.setPosition(i * cell.width, 0);
      this.add(cell);
    }
  }

  _makeBalls() {
    for (let i = 0; i < 3; i++) {
      const ball = this._generateRandomBall();
      this._cells[i].addBall(ball);
    }
    const ballsTypes = this._cells.map(cell => cell.ball.type);
    this.scene.events.emit(EVENTS.BALLS_READY, ballsTypes);
  }

  _generateRandomBall() {
    const type = Math.floor(Math.random() * 4 + 1);
    const ball = new Ball(this.scene, type);

    return ball;
  }
}
