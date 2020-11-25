import * as Phaser from "phaser";
import UiScene from "./ui-scene";
import GameScene from "./game-scene";
import TitleScene from "./title-scene";
import EndScene from "./end-scene";
import PlayerScene from "./player-scene";

var gameScene = new GameScene(
  {
    x: 200,
    y: 0,
    width: 600,
    height: 600,
  }
);
var uiScene = new UiScene(
  {
    x: 0,
    y: 0,
    width: 200,
    height: 600,
  }
);
var titleScene = new TitleScene();
var playerScene = new PlayerScene();
var endScene = new EndScene();

var config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
};

var game = new Phaser.Game(config);

// load scenes
game.scene.add(TitleScene.KEY, titleScene);
game.scene.add(PlayerScene.KEY, playerScene);
game.scene.add(UiScene.KEY, uiScene);
game.scene.add(GameScene.KEY, gameScene);
game.scene.add(EndScene.KEY, endScene);

// start title
game.scene.start(TitleScene.KEY);
