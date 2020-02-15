import { Board } from "./board/board";
import { EffectView } from "./effect-view";
import { EVENTS } from "./events";
import { UI } from "./ui/ui";

export class MainView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
    this.scene.events.on(EVENTS.RESET_GAME_SCENE, this._resetGame, this);
  }

  _build() {
    this._buildBoard();
    this._buildUI();
    this._buildEffectView();
  }

  _destroy() {
    this._destroyBoard();
    this._destroyUI();
    this._destroyEffectView();
  }

  _resetGame() {
    this._destroy();
    this._build();
  }

  _buildBoard() {
    const board = new Board(this.scene);
    this.add((this._board = board));
    board.setPosition(245, 100);
  }

  _destroyBoard() {
    this._board.destroy();
  }

  _destroyUI() {
    this._ui.destroy();
  }

  _destroyEffectView() {
    this._effectView.destroy();
  }

  _buildEffectView() {
    const effectView = new EffectView(this.scene);
    this.add((this._effectView = effectView));
    effectView.setPosition(245, 100);
  }

  _buildUI() {
    this._ui = new UI(this.scene);
    this.add(this._ui);
  }
}
