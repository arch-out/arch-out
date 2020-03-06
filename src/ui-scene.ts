import GameScene from "./game-scene";

export default class UiScene extends Phaser.Scene {
  viewport: Viewport;

  constructor(viewport: Viewport) {
    super({
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
