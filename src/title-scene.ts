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

    var keyObj = this.input.keyboard.addKey("space");
    keyObj.on("down", () => this.startGame());
  }

  startGame() {
    this.scene.switch(GameScene.KEY);
  }
}
