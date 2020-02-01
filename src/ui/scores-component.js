export class ScoresComponent extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._build();
  }

  get score() {
    return +this._score.text;
  }

  updateScore(score) {
    this._score.text = score;
  }

  _build() {
    this._buildTitleText();
    this._buildScoreText();
  }

  _buildTitleText() {
    const text = this.scene.add.text(0, 0, "SCORE:", {
      fontFamily: '"Arial Black"',
      color: "black",
      fontSize: 20
    });
    this.add(text);
  }

  _buildScoreText() {
    this._score = this.scene.add.text(90, 0, "0", {
      fontFamily: '"Arial Black"',
      color: "black",
      fontSize: 20
    });
    this.add(this._score);
  }
}
