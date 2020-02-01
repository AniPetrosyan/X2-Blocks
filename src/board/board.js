import PF from "pathfinding";
import { BOARD_DIMENSIONS } from "../constants";
import { EVENTS } from "../events";
import { Ball } from "./ball";
import { Cell } from "./cell";

export class Board extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._cells = [];
    this._combinations = [];
    this._selectedBall = null;

    this._buildBoard();
    this._makeBalls();
    this.scene.events.on(EVENTS.BALLS_READY, this._onBallsReady, this);
  }

  getRandomEmptyCell() {
    const rndI = Math.floor(Math.random() * BOARD_DIMENSIONS.width);
    const rndJ = Math.floor(Math.random() * BOARD_DIMENSIONS.height);
    const rndCell = this._cells[rndI][rndJ];

    return rndCell;
  }

  getCellByBall(ball) {
    for (let i = 0; i < this._cells.length; i++) {
      const columns = this._cells[i];
      for (let j = 0; j < columns.length; j++) {
        const cell = columns[j];
        if (cell.ball === ball) {
          return cell;
        }
      }
    }
  }

  _onBallsReady(ballsType) {
    //
  }

  _buildBoard() {
    for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
      const column = [];

      for (let row = 0; row < BOARD_DIMENSIONS.height; row++) {
        const cell = new Cell(this.scene, row, col);
        this.add(cell);
        column.push(cell);
        const { width, height } = cell;
        cell.setPosition(col * width + width / 2, row * height + height / 2);
        cell.on("onCellClick", this._onCellClicked, this);
      }

      this._cells.push(column);
    }
  }

  _makeBalls() {
    const emptyCells = this._getEmptyCells();

    for (let i = 0; i < Math.min(3, emptyCells.length); i++) {
      // const ball = this._generateRandomBall();
      // const cell = this.getRandomEmptyCell();
      // cell.addBall(ball);
    }
  }

  _generateRandomBall() {
    const type = Math.floor(Math.random() * 4 + 1);
    const ball = new Ball(this.scene, type);

    return ball;
  }

  _onCellClicked(col, row) {
    const cell = this._cells[col][row];
    const { isEmpty } = cell;

    if (isEmpty) {
      if (this._selectedBall) {
        this._moveBall(cell);
      }
    } else {
      if (this._selectedBall) {
        this._selectedBall.deselectBall();
      }
      this._selectedBall = cell.ball;
      this._selectedBall.selectBall();
    }
  }

  _moveBall(newCell) {
    const prevCell = this.getCellByBall(this._selectedBall);
    const { col: x1, row: y1 } = prevCell;
    const { col: x2, row: y2 } = newCell;

    const path = this._getPath(x1, y1, x2, y2);

    if (path.length !== 0) {
      prevCell.removeBall();
      newCell.addBall(this._selectedBall);
      this._selectedBall.deselectBall();
      this._selectedBall = null;
      this._checkForCombination();

      if (this._combinations.length === 0) {
        this._makeBalls();
        this._checkForCombination();
      }
      this._checkForLose();
    }
  }

  _getEmptyCells() {
    const emptyCells = [];
    this._cells.forEach(col => {
      emptyCells.push(...col.filter(cell => cell.isEmpty));
    });
    return emptyCells;
  }

  _checkForLose() {
    const emptyCells = this._getEmptyCells();
    if (emptyCells.length === 0) {
      console.log("Game Over");
    }
  }

  _getPath(x1, y1, x2, y2) {
    const matrix = this._getObstacleMatrix();

    const finder = new PF.AStarFinder();
    const board = new PF.Grid(matrix);

    const path = finder.findPath(x1, y1, x2, y2, board);

    return path;
  }

  _getObstacleMatrix() {
    const matrix = [];

    for (let y = 0; y < this._cells[0].length; y++) {
      const row = [];
      for (let x = 0; x < this._cells.length; x++) {
        const { isEmpty } = this._cells[x][y];
        row.push(+!isEmpty);
      }
      matrix.push(row);
    }

    return matrix;
  }

  _checkForCombination() {
    this._combinations.length = 0;

    for (let i = 0; i < this._cells.length; i++) {
      const column = this._cells[i];
      for (let j = 0; j < column.length; j++) {
        const cell = column[j];
        if (!cell.isEmpty) {
          const hComb = this._getHorizontalCombination(cell.ball, i, j, [
            cell.ball
          ]);
          const vComb = this._getVerticalCombination(cell.ball, i, j, [
            cell.ball
          ]);

          if (hComb.length >= 5) this._combinations.push(hComb);
          if (vComb.length >= 5) this._combinations.push(vComb);
        }
      }
    }

    this._collectCombinations();
  }

  _getHorizontalCombination(ball, col, row, combination) {
    if (col + 1 >= this._cells.length) {
      return combination;
    }

    const cell = this._cells[col + 1][row];

    if (
      !cell.ball ||
      cell.ball.type !== ball.type ||
      this._alreadyConsistInCombination(ball)
    ) {
      return combination;
    }

    combination.push(cell.ball);

    return this._getHorizontalCombination(cell.ball, col + 1, row, combination);
  }

  _getVerticalCombination(ball, col, row, combination) {
    if (row + 1 >= this._cells[col].length) {
      return combination;
    }

    const cell = this._cells[col][row + 1];

    if (
      !cell.ball ||
      cell.ball.type !== ball.type ||
      this._alreadyConsistInCombination(ball)
    ) {
      return combination;
    }

    combination.push(cell.ball);

    return this._getVerticalCombination(cell.ball, col, row + 1, combination);
  }

  _alreadyConsistInCombination(ball) {
    for (let i = 0; i < this._combinations.length; i++) {
      const combination = this._combinations[i];
      for (let j = 0; j < combination.length; j++) {
        if (combination[j].uuid === ball.uuid) {
          return true;
        }
      }
    }
    return false;
  }

  _collectCombinations() {
    this._combinations.forEach(combination => {
      const score = combination.length * 10;
      this.scene.events.emit(EVENTS.COMBINATION_COLLECTED, score);
      combination.forEach(ball => {
        const cell = this.getCellByBall(ball);
        setTimeout(() => {
          cell.removeBall();
        }, 1000);
      });
    });
  }
}
