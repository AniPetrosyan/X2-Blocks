import { BOARD_DIMENSIONS, CUBE } from "../constants";
import { Cell } from "./cell";
import { Column } from "./column";

export class Board extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._cells = [];
    this._columns = [];
    this._build();
  }

  _build() {
    this._buildBg();
    this._buildBoard();
    this._buildInteractiveColumns();
  }

  _buildBg() {
    const gr = this.scene.add.graphics();
    gr.lineStyle(3, 0xc4eac8, 0.9);
    gr.strokeRoundedRect(0, 0, 290, 390, 10);
    this.add(gr);
  }

  _buildBoard() {
    for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
      const column = [];

      for (let row = 0; row < BOARD_DIMENSIONS.height; row++) {
        const cell = new Cell(this.scene, row, col);
        this.add(cell);
        column.push(cell);
        cell.setPosition(
          col * (CUBE.width + CUBE.gap) + 15,
          row * (CUBE.height + CUBE.gap) + 12
        );
      }

      this._cells.push(column);
    }
  }

  _buildInteractiveColumns() {
    for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
      const column = new Column(this.scene, col);
      this.add(column);
      this._columns.push(column);
      column.setPosition(col * (CUBE.width + CUBE.gap) + 15, 0);
      column.on("mouseOver", this._onMouseOver, this);
      column.on("mouseOut", this._onMouseOut, this);
    }
  }

  _onMouseOver(col) {
    const column = this._columns[col];
    column.setBg();
  }

  _onMouseOut(col) {
    const column = this._columns[col];
    column.removeBg();
  }
}
