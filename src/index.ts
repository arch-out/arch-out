import * as Phaser from "phaser";

// index.ts
console.log("Hello world");

var config = {
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
  scene: null,
  backgroundColor: 0x333333
};
var game = new Phaser.Game(config);
