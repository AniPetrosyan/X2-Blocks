import { Cube } from "./board/cube";
import { EVENTS } from "./events";

export class EffectView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this.scene.events.on(EVENTS.CUBES_REMOVED, this._cubesCollectAnim, this);
    this.scene.events.on(EVENTS.BUBBLE_READY, this._bubbleAnim, this);
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
      duration: 250
    });
    setTimeout(() => {
      this.remove(cubes);
      this.scene.events.emit(EVENTS.COLLECT_ANIM_END);
    }, 250);
  }

  _bubbleAnim(endPoints, startPoints, types) {
    for (let i = 0; i < startPoints.length; i++) {
      const cube = new Cube(this.scene, types[i]);
      this.add(cube);
      cube.setPosition(startPoints[i].x, startPoints[i].y);

      this.scene.tweens.add({
        targets: cube,
        x: endPoints[i].x,
        y: endPoints[i].y,
        ease: "Power1",
        duration: 250
      });
      setTimeout(() => {
        this.remove(cube);
      }, 250);
    }
    setTimeout(() => {
      this.scene.events.emit(EVENTS.BUBBLE_ANIM_END);
    }, 250);
  }
}
