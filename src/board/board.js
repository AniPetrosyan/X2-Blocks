import { BOARD_DIMENSIONS } from "../constants";
import { Cell } from "./cell";

export class Board extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._cells = [];
    this._build();
  }

  _build() {
    this._buildBg();
    this._buildBoard();
  }

  _buildBg() {
    const gr = this.scene.add.graphics();
    gr.lineStyle(3, 0xc4eac8, 0.9);
    gr.strokeRoundedRect(0, 0, 300, 400, 10);
    this.add(gr);
  }

  _buildBoard() {
    const gap = 2;
    for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
      const column = [];

      for (let row = 0; row < BOARD_DIMENSIONS.height; row++) {
        const cell = new Cell(this.scene, row, col);
        this.add(cell);
        column.push(cell);
        const { width, height } = cell;
        cell.setPosition(col * (width + gap) + 20, row * (height + gap) + 17);
      }

      this._cells.push(column);
    }
  }
}
