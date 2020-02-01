export class Cell extends Phaser.GameObjects.Container {
  constructor(scene, row, col) {
    super(scene);

    this.width = 50;
    this.height = 50;
    this._row = row;
    this._col = col;

    this._build();
  }

  _build() {
    const bg = this.scene.add.graphics();
    bg.fillStyle(0xff0000, 0.5);
    bg.fillRect(0, 0, 50, 50);
    this.add(bg);
  }

  get row() {
    return this._row;
  }

  get col() {
    return this._col;
  }
}
