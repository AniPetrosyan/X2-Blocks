export class ScoresComponent extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this._scores = 0;
    this._build();
  }

  get score() {
    return +this._score.text;
  }

  updateScore(score) {
    this._scores += score;
    this._score.text = this._scores;
  }

  _build() {
    this._buildTitleText();
    this._buildScoreText();
  }

  _buildTitleText() {
    const text = this.scene.add.text(20, 20, "SCORE:", {
      fontFamily: '"Arial Black"',
      color: "white",
      fontSize: 20
    });
    this.add(text);
  }

  _buildScoreText() {
    this._score = this.scene.add.text(110, 20, "0", {
      fontFamily: '"Arial Black"',
      color: "white",
      fontSize: 20
    });
    this.add(this._score);
  }
}
