import { CUBE } from "../constants";

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

  // updateValue(value) {
  //   this._value = value;
  //   //update colour
  // }

  _build() {
    this._setValue();
    this._setColour();
    this._buildBg();
    this._buildText();
  }
  _setColour() {
    switch (this._type) {
      case 1:
        this._colour = 0x33f422;
        break;
      case 2:
        this._colour = 0xe54e1d;
        break;
      case 3:
        this._colour = 0xe88c20;
        break;
      case 4:
        this._colour = 0x82e9d3;
        break;
      case 5:
        this._colour = 0xe9e937;
        break;
      case 6:
        this._colour = 0x999907;
        break;
      case 7:
        this._colour = 0x1f9e0a;
        break;
      case 8:
        this._colour = 0x74e9e8;
        break;
      case 9:
        this._colour = 0x2d8f8e;
        break;
      case 10:
        this._colour = 0x8d31c3;
        break;
      case 11:
        this._colour = 0x546ef6;
        break;
      case 12:
        this._colour = 0x7680b8;
        break;
    }
  }

  _setValue() {
    this._value **= this._type;
  }

  _buildBg() {
    const bg = this.scene.add.graphics();
    bg.fillStyle(this._colour);
    bg.fillRoundedRect(0, 0, CUBE.width, CUBE.height, 5);
    this.add(bg);
    this._bg = bg;
  }

  _buildText() {
    // const { width, height } = this._bg;

    const text = this.scene.add.text(25, 25, this._value, {
      fontFamily: '"Arial Black"',
      color: "black",
      fontSize: 13
    });
    text.setOrigin(0.5);
    this.add(text);
  }
}
