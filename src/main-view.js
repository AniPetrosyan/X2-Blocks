import { Board } from "./board/board";
import { EffectView } from "./effect-view";
import { UI } from "./ui/ui";

export class MainView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
  }

  _build() {
    this._buildBoard();
    this._buildUI();
    this._buildEffectView();
  }

  _buildBoard() {
    const board = new Board(this.scene);
    this.add(board);
    board.setPosition(245, 100);
  }

  _buildEffectView() {
    const effectView = new EffectView(this.scene);
    this.add(effectView);
    effectView.setPosition(245, 100);
  }

  _buildUI() {
    this._ui = new UI(this.scene);
    this.add(this._ui);
  }
}
