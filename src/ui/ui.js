import { EVENTS } from "../events";
import { NextBallsComponent } from "./next-balls-component";
import { ScoresComponent } from "./scores-component";

export class UI extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
    this.scene.events.on(
      EVENTS.COMBINATION_COLLECTED,
      this._onCombinationCollected,
      this
    );
  }

  _onCombinationCollected(score) {
    this._scores.updateScore(this._scores.score + score);
  }

  _build() {
    this._buildNextBallsComponent();
    this._buildScoresComponent();
    this._buildHighScoresComponent();
  }

  _buildNextBallsComponent() {
    this._nextBalls = new NextBallsComponent(this.scene);
    this.add(this._nextBalls);
    this._nextBalls.setPosition(200, 400);
  }

  _buildScoresComponent() {
    this._scores = new ScoresComponent(this.scene);
    this.add(this._scores);
  }

  _buildHighScoresComponent() {
    //
  }
}
