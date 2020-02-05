import { BOARD_DIMENSIONS, CUBE } from "../constants";
import { EVENTS } from "../events";
import { Cell } from "./cell";
import { Column } from "./column";
import { Cube } from "./cube";

export class Board extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._cells = [];
    this._columns = [];

    this._build();
    this.scene.events.on(EVENTS.CUBE_READY, this._onCubeReady, this);
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
      column.on("pointerUp", this._onPointerUp, this);
    }
  }

  _addCubeToBoard(col) {
    for (let i = 0; i < this._cells[col].length; i++) {
      const cell = this._cells[col][i];
      if (cell.isEmpty) {
        const cube = new Cube(this.scene, this._cubeType);
        cell.addCube(cube);
        this.scene.events.emit(EVENTS.CUBE_ADDED);
        break;
      }
    }
  }

  _onPointerUp(col) {
    this._addCubeToBoard(col);
  }

  _onMouseOver(col) {
    const column = this._columns[col];
    column.setBg();
  }

  _onMouseOut(col) {
    const column = this._columns[col];
    column.removeBg();
  }

  _onCubeReady(cubeType) {
    this._cubeType = cubeType;
  }
}
