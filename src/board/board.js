export class Board extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    // this._cells = [];

    // this._buildBoard();
  }

  // _buildBoard() {
  //   for (let col = 0; col < BOARD_DIMENSIONS.width; col++) {
  //     const column = [];

  //     for (let row = 0; row < BOARD_DIMENSIONS.height; row++) {
  //       const cell = new Cell(this.scene, row, col);
  //       this.add(cell);
  //       column.push(cell);
  //       const { width, height } = cell;
  //       cell.setPosition(col * width + width / 2, row * height + height / 2);
  //       // cell.on("onCellClick", this._onCellClicked, this);
  //     }

  //     this._cells.push(column);
  //   }
  // }
}
