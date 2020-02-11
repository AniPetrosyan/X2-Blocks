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
    this._combinations = 0;
    this._matchingCells = [];
    this._cellsForChecking = [];

    this._cellsForBubbledCubes = [];
    this._bubbledCubes = [];

    this._build();
    this.scene.events.on(EVENTS.CUBE_READY, this._onCubeReady, this);

    this.scene.events.on(EVENTS.BUBBLE_ANIM_END, this._onBubbleAnimEnd, this);
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

  // Building Board

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
        const { col: x, row: y } = cell;
        const { value } = cube;
        this._checkForAllCombinations(cell, value, x, y);

        break;
      }
    }
  }

  // Making Combinations

  _checkForAllCombinations(cell, value, x, y) {
    this._checkForUpCombination(value, x, y);
    this._checkForLeftCombination(value, x, y);
    this._checkForRightCombination(value, x, y);
    if (this._combinations > 0) {
      this._matchingCells.push(cell);
      this._collectCombinations(cell);
    }
  }

  _checkForUpCombination(value, x, y) {
    if (y > 0) {
      const checkingCell = this._cells[x][y - 1];
      if (!checkingCell.isEmpty && checkingCell.cube.value === value) {
        this._combinations++;
        this._matchingCells.push(checkingCell);
      }
    }
  }

  _checkForLeftCombination(value, x, y) {
    if (x > 0) {
      const checkingCell = this._cells[x - 1][y];
      if (!checkingCell.isEmpty && checkingCell.cube.value === value) {
        this._combinations++;
        this._matchingCells.push(checkingCell);
      }
    }
  }

  _checkForRightCombination(value, x, y) {
    if (x < BOARD_DIMENSIONS.width - 1) {
      const checkingCell = this._cells[x + 1][y];
      if (!checkingCell.isEmpty && checkingCell.cube.value === value) {
        this._combinations++;
        this._matchingCells.push(checkingCell);
      }
    }
  }

  //Removing cubes

  _collectCombinations(cell) {
    this._bubbleCheckingCell = cell;
    const endPoint = cell.getPosition();
    const startPoints = [];

    const { type } = cell.cube;
    this._matchingCells.forEach(cell => {
      const position = cell.getPosition();
      startPoints.push(position);
      cell.removeCube();
    });
    this._matchingCells.length = 0;
    this.scene.events.emit(EVENTS.CUBES_REMOVED, endPoint, startPoints, type);

    const newType = type + this._combinations;
    const cube = new Cube(this.scene, newType);
    cell.addCube(cube);
    this.scene.events.emit(EVENTS.CUBES_COLLECTED, cube.value);
    this._combinations = 0;

    this.scene.events.on(EVENTS.COLLECT_ANIM_END, this._onCollectAnimEnd, this);
  }

  _onCollectAnimEnd() {
    this._bubbleBoard();
  }

  _bubbleBoard() {
    const cell = this._bubbleCheckingCell;

    //this._cellsForBubbledCubes.length = 0;
    //this._bubbledCubes.length = 0;
    const endPoints = [];
    const startPoints = [];
    const types = [];
    this._checkingCubes = [];
    let newCell = cell;
    if (cell.row > 0 && this._cells[cell.col][cell.row - 1].isEmpty) {
      const endPoint = this._cells[cell.col][cell.row - 1].getPosition();
      const startPoint = newCell.getPosition();

      const cube = cell.cube;
      const { type } = cube;

      endPoints.push(endPoint);
      startPoints.push(startPoint);
      types.push(type);
      newCell = this._cells[cell.col][cell.row - 1];
      cell.removeCube();
      // newCell.addCube(cube);

      this._cellsForBubbledCubes.push(newCell);
      this._bubbledCubes.push(cube);
    }

    this._checkingCubes.push(newCell);
    for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
      for (let row = 0; row < BOARD_DIMENSIONS.height; row++) {
        if (this._cells[col][row].isEmpty) {
          let movedUpCubes = 0;
          for (let i = row + 1; i < BOARD_DIMENSIONS.height; i++) {
            if (!this._cells[col][i].isEmpty) {
              const cube = this._cells[col][i].cube;
              const cell = this._cells[col][row + movedUpCubes];

              const startPoint = this._cells[col][i].getPosition();
              const { type } = cube;
              const endPoint = cell.getPosition();
              endPoints.push(endPoint);
              types.push(type);
              startPoints.push(startPoint);
              this._cells[col][i].removeCube();
              // cell.addCube(cube);

              this._checkingCubes.push(cell);
              movedUpCubes++;

              this._cellsForBubbledCubes.push(cell);
              this._bubbledCubes.push(cube);
            }
          }
        }
      }
    }

    this.scene.events.emit(EVENTS.BUBBLE_READY, endPoints, startPoints, types);
  }

  _onBubbleAnimEnd() {
    console.log(this._cellsForBubbledCubes);
    for (let i = 0; i < this._cellsForBubbledCubes.length; i++) {
      this._cellsForBubbledCubes[i].addCube(this._bubbledCubes[i]);
      this._secondCheckForCombo();
    }
  }

  //Second check

  _secondCheckForCombo() {
    console.log("anim");

    console.log(this._checkingCubes);

    this._checkingCubes.forEach(cell => {
      if (!cell.isEmpty) {
        const { cube, col, row } = cell;
        this._checkForAllCombinations(cell, cube.value, col, row);
      }
    });
    this._checkingCubes.length = 0;
  }

  // Events
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
