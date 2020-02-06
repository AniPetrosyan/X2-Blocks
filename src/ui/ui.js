import { EVENTS } from "../events";
import { NextCube } from "./next-cube";
import { ScoresComponent } from "./scores-component";

export class UI extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
    this.scene.events.on(EVENTS.CUBE_ADDED, this._onCubeAdded, this);
  }

  _build() {
    this._buildScoresComponent();
    this._buildNextCube();
  }

  _onCubeAdded() {
    this._nextCube.updateCube();
  }

  _buildNextCube() {
    this._nextCube = new NextCube(this.scene);
    this.add(this._nextCube);
    this._nextCube.setPosition(365, 512);
  }

  _buildScoresComponent() {
    this._scores = new ScoresComponent(this.scene);
    this.add(this._scores);
  }
}
