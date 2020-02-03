import { Board } from "./board/board";
import { UI } from "./ui/ui";

export class MainView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
  }

  _build() {
    this._buildBoard();
    this._buildUI();
  }

  _buildBoard() {
    const board = new Board(this.scene);
    this.add(board);
    board.setPosition(245, 100);
  }

  _buildUI() {
    this._ui = new UI(this.scene);
    this.add(this._ui);
  }
}
