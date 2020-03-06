import GameScene from "./game-scene";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: "titleScene",
      active: true,
      visible: true
    });
  }

  update() {}

  create() {
    var text = this.add.text(100, 100, "START");
    text.setInteractive({ useHandCursor: true });
    text.on("pointerdown", () => this.startGame());

    this.add.text(100, 200, "Press 'F' for full screen.", {
      fontSize: 10
    });

    var keyObj = this.input.keyboard.addKey("space");
    keyObj.on("down", () => this.startGame());

    var f = this.input.keyboard.addKey("f");
    f.on("down", () => this.scale.startFullscreen());
  }

  startGame() {
    this.scene.switch(GameScene.KEY);
  }
}
