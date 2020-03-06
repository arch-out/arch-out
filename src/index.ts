import * as Phaser from "phaser";
import UiScene from "./ui-scene";
import GameScene from "./game-scene";

type Position = {
  x: number;
  y: number;
};

var config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: {
    createContainer: false
  },
  scene: [new UiScene(), new GameScene()],
  backgroundColor: 0x333333
};

new Phaser.Game(config);
