import GameScene from "./game-scene";
import { Viewport } from "./types";

export default class UiScene extends Phaser.Scene {
  public static KEY: string = "UiScene";

  viewport: Viewport;

  constructor(viewport: Viewport) {
    super({
      key: UiScene.KEY,
      active: false,
      visible: true
    });
    this.viewport = viewport;
  }

  create() {
    this.cameras.main.setBackgroundColor(0x0000ff);
    this.cameras.main.setViewport(
      this.viewport.x,
      this.viewport.y,
      this.viewport.width,
      this.viewport.height
    );

    this.scene.launch(GameScene.KEY);
  }

  update() {}
}
