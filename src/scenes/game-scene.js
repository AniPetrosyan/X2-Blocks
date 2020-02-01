import { MainView } from "../main-view";

export class GameScene extends Phaser.Scene {
  create() {
    this._buildMainView();
  }

  _buildMainView() {
    const mainView = new MainView(this);
    this.add.existing(mainView);
  }
}
