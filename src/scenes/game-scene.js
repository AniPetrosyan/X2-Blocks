import { MainView } from "../main-view";

export class GameScene extends Phaser.Scene {
  create() {
    this._buildMainView();
    // this.events.on(EVENTS.RESET_GAME_SCENE, this._resetGame, this);
  }
  _resetGame() {
    // this.scene.restart(SceneNames.game);
    this.children.destroy();
    this._buildMainView();
  }

  _buildMainView() {
    this._mainView = new MainView(this);
    this.add.existing(this._mainView);
  }
}
