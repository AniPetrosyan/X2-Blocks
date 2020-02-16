import { COLOUR, CUBE } from "../constants";

export class Cube extends Phaser.GameObjects.Container {
  constructor(scene, type) {
    super(scene);
    this._type = type;
    this._value = 2;
    this._colour = null;
    this._build();
  }

  get type() {
    return this._type;
  }
  get value() {
    return this._value;
  }

  _build() {
    this._setValue();
    this._buildBg();
    this._buildText();
  }

  _setValue() {
    this._value **= this._type;
  }

  _buildBg() {
    const bg = this.scene.add.graphics();
    bg.fillStyle(COLOUR[this._type]);
    bg.fillRoundedRect(0, 0, CUBE.width, CUBE.height, 5);
    this.add(bg);
  }

  _buildText() {
    const text = this.scene.add.text(25, 25, this._value, {
      fontFamily: '"Arial Black"',
      color: "black",
      fontSize: 13
    });
    text.setOrigin(0.5);
    this.add(text);
  }
}
