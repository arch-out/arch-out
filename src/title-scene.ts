import GameScene from "./game-scene";
import titlePath from "./images/gameTitle.png";
import terningPath from "./images/terningkast6.png";
import dagPath from "./images/dag.png";
import ainaPath from "./images/aina.png";
import eivindPath from "./images/eivind.png";
import EndScene from "./end-scene";

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
    this.load.image("terningkast6", terningPath);
    this.load.image("dag", dagPath);
    this.load.image("aina", ainaPath);
    this.load.image("eivind", eivindPath);
  }

  update() { }

  create() {
    var centerX = this.cameras.main.centerX;
    var centerY = this.cameras.main.centerY;

    this.add
      .image(centerX, centerY - 160, "title")
      .setScale(0.5);

    this.add
      .text(centerX, centerY - 90, "START")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.startGame());

    this.add
      .text(centerX, centerY - 60, "HIGH SCORE").setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.showHighscore());

    this.add
      .text(centerX, centerY - 30, "Press 'F' for full screen.", {
        fontSize: 10,
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 20, "Det besta spelet eg nokon gong har spelt", {
        fontSize: 14,
      })
      .setOrigin(0.5);

    this.add
      .image(centerX + 200, centerY + 20, "terningkast6")
      .setScale(0.2);

    this.add
      .text(centerX + 70, centerY + 40, "- sa ingen", {
        fontSize: 10,
      })
      .setOrigin(0.5);

    this.add
      .image(centerX - 200, centerY + 180, "dag")
      .setScale(0.75)
      .setRotation(0.3);
    this.add
      .image(centerX, centerY + 200, "aina")
      .setScale(0.7);
    this.add
      .image(centerX + 200, centerY + 180, "eivind")
      .setScale(0.75)
      .setRotation(-0.3);

    this.add
      .text(centerX, centerY + 100, "Stolt presentert av:", {
        fontSize: 16,
      })
      .setOrigin(0.5);

    this.input.keyboard.addKey("space").on("down", () => this.startGame());
    this.input.keyboard.addKey("f").on("down", () => this.scale.startFullscreen());
    this.input.keyboard.addKey("h").on("down", () => this.showHighscore());
  }

  startGame() {
    this.scene.switch(GameScene.KEY);
  }

  showHighscore() {
    this.scene.switch(EndScene.KEY);
  }
}
