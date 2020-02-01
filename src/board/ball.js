import { TEXTURE } from "../constants";
import { getUUID } from "../utils/utils";

export class Ball extends Phaser.GameObjects.Image {
  constructor(scene, type) {
    super(scene, 0, 0, TEXTURE, `${type}.png`);
    this._type = type;
    this._uuid = getUUID("ball");
  }

  get type() {
    return this._type;
  }

  get uuid() {
    return this._uuid;
  }

  selectBall() {
    this.scale = 1.2;
  }

  deselectBall() {
    this.scale = 1;
  }
}
