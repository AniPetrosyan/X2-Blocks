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
    for (let i = 0; i < BOARD_DIMENSIONS.width; i++) {
      const column = new Column(this.scene);
      this.add(column);
      this._columns.push(column);
      column.setPosition(i * (CUBE.width + CUBE.gap) + 15, 0);
      //event on
      column.on("onCellClick", this._onCellClicked, this);
    }
  }

  _onCellClicked() {
    console.log("test");
  }
}
