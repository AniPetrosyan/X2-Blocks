import { CUBE } from "../constants";

export class Cube extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._value = NaN;

    this._build();
  }

  get value() {
    return _value;
  }

  updateValue(value) {
    this._value = value;
    //update colour
  }

  _build() {
    this._buildBg();
    this._buildText();
  }

  _buildBg() {
    const bg = this.scene.add.graphics();
    bg.fillStyle(0x33f422);
    bg.fillRoundedRect(0, 0, CUBE.width, CUBE.height, 5);
    this.add(bg);
    this._bg = bg;
  }

  _buildText() {
    // const { width, height } = this._bg;

    const text = this.scene.add.text(25, 25, "0", {
      fontFamily: '"Arial Black"',
      color: "black",
      fontSize: 15
    });
    text.setOrigin(0.5);
    this.add(text);
  }
}
