import * as Phaser from "phaser";
import UiScene from "./ui-scene";
import GameScene from "./game-scene";
import TitleScene from "./title-scene";

type Position = {
  x: number;
  y: number;
};

var gameScene = new GameScene();
var uiScene = new UiScene();
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
  },
  //scene: [uiScene, gameScene],
  backgroundColor: 0x333333
};

var game = new Phaser.Game(config);

// load scenes
game.scene.add('titleScene', titleScene);
game.scene.add('gameScene', gameScene);
game.scene.add('uiScene', uiScene);

// start title
game.scene.start('titleScene');
