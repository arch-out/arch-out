import * as Phaser from "phaser";
import UiScene from "./ui-scene";
import GameScene from "./game-scene";
import TitleScene from "./title-scene";

var gameScene = new GameScene({
  x: 200,
  y: 0,
  width: 600,
  height: 600
});
var uiScene = new UiScene({
  x: 0,
  y: 0,
  width: 200,
  height: 600
});
var titleScene = new TitleScene();

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
  }
};

var game = new Phaser.Game(config);

// load scenes
game.scene.add("titleScene", titleScene);
game.scene.add("gameScene", gameScene);
game.scene.add("uiScene", uiScene);

// start title
game.scene.start("titleScene");
