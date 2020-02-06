import { Cube } from "../board/cube";
import { EVENTS } from "../events";

export class NextCube extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
  }
  updateCube() {
    this.remove(this._cube);
    this._generateRandomCube();
    const cubeType = this._cube.type;

    this.scene.events.emit(EVENTS.CUBE_READY, cubeType);
  }

  _build() {
    this.updateCube();
  }

  _generateRandomCube() {
    const type = Math.floor(Math.random() * 6 + 1);
    this._cube = new Cube(this.scene, type);
    this.add(this._cube);
  }
}
