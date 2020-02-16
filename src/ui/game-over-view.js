import { TEXTURE } from "../constants";
import { EVENTS } from "../events";

export class GameOver extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._build();
  }

  _build() {
    this._buildBg();
    this._buildText();
    this._buildRestart();
  }

  _buildBg() {
    const bg = this.scene.add.image(0, 0, TEXTURE, "background");
    bg.setOrigin(0, 0);
    bg.setAlpha(0.9);
    this.add(bg);
  }

  _buildText() {
    const text = this.scene.add.text(390, 200, "Game Over", {
      fontFamily: '"Arial Black"',
      color: "white",
      fontSize: 30
    });
    text.setOrigin(0.5);
    this.add(text);
  }

  _buildRestart() {
    const restartIcon = this.scene.add.image(390, 300, TEXTURE, "restart");
    restartIcon.setScale(0.2);
    restartIcon.setRotation(1);
    this.add(restartIcon);
    restartIcon.setInteractive();
    restartIcon.on(Phaser.Input.Events.POINTER_UP, this._onPointerUp, this);
  }

  _onPointerUp() {
    this.scene.events.emit(EVENTS.RESET_GAME_SCENE);
  }
}
