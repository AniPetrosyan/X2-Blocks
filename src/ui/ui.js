import { EVENTS } from "../events";
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
    this._buildScoresComponent();
  }

  _buildScoresComponent() {
    this._scores = new ScoresComponent(this.scene);
    this.add(this._scores);
  }
}
