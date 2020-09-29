import GameScene from "./game-scene";
import titlePath from "./images/gameTitle.png";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: "titleScene",
      active: true,
      visible: true,
    });
  }

  preload() {
    this.load.image("title", titlePath);
  }

  update() {}

  create() {
    var centerX = this.cameras.main.centerX;
    var centerY = this.cameras.main.centerY;
    var titleImgage = this.add.image(centerX, centerY - 100, "title");
    titleImgage.setScale(0.5);

    var text = this.add.text(centerX, centerY, "START").setOrigin(0.5);
    text.setInteractive({ useHandCursor: true });
    text.on("pointerdown", () => this.startGame());

    this.add
      .text(centerX, centerY + 150, "Press 'F' for full screen.", {
        fontSize: 10,
      })
      .setOrigin(0.5);

    var keyObj = this.input.keyboard.addKey("space");
    keyObj.on("down", () => this.startGame());

    var f = this.input.keyboard.addKey("f");
    f.on("down", () => this.scale.startFullscreen());
  }

  startGame() {
    this.scene.switch(GameScene.KEY);
  }
}
