import { EVENTS } from "../events";
import { GameOver } from "./game-over-view";
import { NextCube } from "./next-cube";
import { ScoresComponent } from "./scores-component";

export class UI extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
    this.scene.events.on(EVENTS.CUBE_ADDED_TO_BOARD, this._onCubeAdded, this);
    this.scene.events.on(EVENTS.CUBES_COLLECTED, this._onCubesCollected, this);
    this.scene.events.on(EVENTS.GAME_OVER, this._buildGameOver, this);
  }

  _build() {
    this._buildScoresComponent();
    this._buildNextCube();
  }

  _onCubesCollected(endP, startP, type, score) {
    this._scores.updateScore(score);
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

  _buildGameOver() {
    const gameOver = new GameOver(this.scene);
    this.add(gameOver);
  }
}
