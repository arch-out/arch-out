import * as Phaser from "phaser";
import UiScene from "./ui-scene";
import GameScene from "./game-scene";

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
  scene: [
    new UiScene({
      x: 0,
      y: 0,
      width: 200,
      height: 600
    }),
    new GameScene({
      x: 200,
      y: 0,
      width: 600,
      height: 600
    })
  ]
};

new Phaser.Game(config);
