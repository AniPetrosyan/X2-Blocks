import { EVENTS } from "../events";

export class Column extends Phaser.GameObjects.Container {
  constructor(scene, col) {
    super(scene);

    this._col = col;

    this._build();
    this._addListeners();
    this.scene.events.on(EVENTS.CUBES_REMOVED, this._disableInteractive, this);
    this.scene.events.on(
      EVENTS.COLLECT_ANIM_END,
      this._enableInteractive,
      this
    );
  }
  get col() {
    return this._col;
  }

  setBg() {
    this._bg.setAlpha(0.3);
  }
  removeBg() {
    this._bg.setAlpha(0.1);
  }

  _build() {
    const bg = this.scene.add.image(0, 0, "column");
    bg.setOrigin(0, 0);
    bg.setAlpha(0.1);
    this.add((this._bg = bg));
  }

  _disableInteractive() {
    this._bg.disableInteractive();
  }
  _enableInteractive() {
    this._bg.setInteractive();
  }

  // events emit

  _addListeners() {
    this._bg.setInteractive();
    this._bg.on(Phaser.Input.Events.POINTER_OVER, this._onPointerOver, this);
    this._bg.on(Phaser.Input.Events.POINTER_OUT, this._onPointerOut, this);
    this._bg.on(Phaser.Input.Events.POINTER_UP, this._onPointerUp, this);
  }

  _onPointerUp() {
    this.emit("pointerUp", this._col);
  }

  _onPointerOver() {
    this.emit("mouseOver", this._col);
  }

  _onPointerOut() {
    this.emit("mouseOut", this._col);
  }
}
