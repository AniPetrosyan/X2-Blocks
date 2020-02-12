import { Cube } from "./board/cube";
import { EVENTS } from "./events";

export class EffectView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this.scene.events.on(
      EVENTS.CUBE_ADDED_TO_BOARD,
      this._cubeAddingAnim,
      this
    );
    this.scene.events.on(EVENTS.CUBES_COLLECTED, this._cubesCollectAnim, this);
    this.scene.events.on(EVENTS.BOARD_BUBBLE_COMPLETE, this._bubbleAnim, this);
  }

  _cubeAddingAnim(endPoint, startPoint, type) {
    const cube = new Cube(this.scene, type);
    this.add(cube);
    cube.setPosition(startPoint.x, startPoint.y);

    this.scene.tweens.add({
      targets: cube,
      x: endPoint.x,
      y: endPoint.y,
      ease: "Power1",
      duration: 250,
      onComplete: () => {
        this.remove(cube);
        this.scene.events.emit(
          EVENTS.EFFECT_VIEW_CUBE_ADDING_ANIMATION_FINISHED
        );
      }
    });
  }

  _cubesCollectAnim(endPoint, startPoints, type) {
    const cubes = [];
    startPoints.forEach(startPoint => {
      const cube = new Cube(this.scene, type);
      this.add(cube);
      cube.setPosition(startPoint.x, startPoint.y);
      cubes.push(cube);
    });
    cubes.reverse();

    this.scene.tweens.add({
      targets: cubes,
      x: endPoint.x,
      y: endPoint.y,
      ease: "Power1",
      duration: 250,
      onComplete: () => {
        this.remove(cubes);
        this.scene.events.emit(
          EVENTS.EFFECT_VIEW_CUBES_COLLECT_ANIMATION_FINISHED
        );
      }
    });
  }

  _bubbleAnim(endPoints, startPoints, types) {
    let lastTween;

    for (let i = 0; i < startPoints.length; i++) {
      const cube = new Cube(this.scene, types[i]);
      this.add(cube);
      cube.setPosition(startPoints[i].x, startPoints[i].y);

      lastTween = this.scene.tweens.add({
        targets: cube,
        x: endPoints[i].x,
        y: endPoints[i].y,
        ease: "Power1",
        duration: 250,
        onComplete: () => {
          this.remove(cube);
        }
      });
    }
    if (lastTween) {
      lastTween.on("complete", () => {
        this.scene.events.emit(EVENTS.EFFECT_VIEW_BUBBLE_ANIMATION_FINISHED);
      });
    } else {
      this.scene.events.emit(EVENTS.EFFECT_VIEW_BUBBLE_ANIMATION_FINISHED);
    }
  }
}
