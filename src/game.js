import { SceneNames } from "./constants";
import { GameScene } from "./scenes/game-scene";
import { PreloadScene } from "./scenes/preload-scene";

export class Game extends Phaser.Game {
  constructor(gameConfig) {
    super(gameConfig);
    this._initializeScenes();
    this.scene.start(SceneNames.preload);
  }

  _initializeScenes() {
    this.scene.add(SceneNames.preload, new PreloadScene());
    this.scene.add(SceneNames.game, new GameScene());
  }
}
