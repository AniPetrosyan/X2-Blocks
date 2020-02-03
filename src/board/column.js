export class Column extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this._build();
    this._addListeners();
  }

  _build() {
    const bg = this.scene.add.graphics();
    bg.fillStyle(0xf5e1e2, 0.5);
    bg.fillRect(0, 0, 50, 390);
    this.add((this._bg = bg));
  }

  // events emit

  _addListeners() {
    this._bg.setInteractive();
    this._bg.on("pointerup", this._onPointerUp, this);
  }

  _onPointerUp() {
    this.emit("onCellClick");
    console.log("test click");
  }
}
