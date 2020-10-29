import GameScene from "./game-scene";
import titlePath from "./images/gameTitle.png";
import dagPath from "./images/dag.png";
import ainaPath from "./images/aina.png";
import eivindPath from "./images/eivind.png";

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
    this.load.image("dag", dagPath);
    this.load.image("aina", ainaPath);
    this.load.image("eivind", eivindPath);
  }

  update() {}

  create() {
    var centerX = this.cameras.main.centerX;
    var centerY = this.cameras.main.centerY;
    var titleImgage = this.add.image(centerX, centerY - 120, "title");
    titleImgage.setScale(0.5);

    this.add
      .text(centerX, centerY + 150, "LAGA AV", {
        fontSize: 20,
      })
      .setOrigin(0.5);

    var dag = this.add
      .image(centerX - 200, centerY + 180, "dag")
      .setScale(0.75);
    dag.rotation = 0.3;
    var aina = this.add.image(centerX, centerY + 200, "aina").setScale(0.7);
    var eivind = this.add
      .image(centerX + 200, centerY + 180, "eivind")
      .setScale(0.75);
    eivind.rotation = -0.3;

    var text = this.add.text(centerX, centerY - 50, "START").setOrigin(0.5);
    text.setInteractive({ useHandCursor: true });
    text.on("pointerdown", () => this.startGame());

    this.add
      .text(centerX, centerY - 20, "Press 'F' for full screen.", {
        fontSize: 10,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 100, "Stolt presentert av:", {
        fontSize: 14,
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
