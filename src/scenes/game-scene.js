import { MainView } from "../main-view";

export class GameScene extends Phaser.Scene {
  create() {
    this._buildMainView();
  }

  _buildMainView() {
    this._mainView = new MainView(this);
    this.add.existing(this._mainView);
  }
}
