import * as Phaser from "phaser";
import { BoardSize } from "~types";
import { Snake } from "./snake";

const boardSize: BoardSize = {
  width: 800,
  height: 600
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "gameScene",
      active: false,
      visible: false,
      physics: {
        default: "arcade",
        arcade: {}
      }
    });
  }

  angle: number = 0;
  speed: number = 5;
  keys: {
    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  showHitboxes = false;

  path: Phaser.Curves.Path;

  snake1: Snake;
  snake2: Snake;

  create() {
    this.input.enabled = true;
    this.keys = {
      down: this.input.keyboard.addKey("DOWN"),
      up: this.input.keyboard.addKey("UP"),
      d: this.input.keyboard.addKey("d")
    };

    this.snake1 = new Snake(this, 100, 100, "LEFT", "RIGHT", boardSize);
    this.snake2 = new Snake(this, 200, 200, "a", "s", boardSize);
  }
  update() {
    if (!this.showHitboxes && this.keys.d.isDown) {
      this.showHitboxes = true;
      this.physics.world.createDebugGraphic();
    }

    if (this.keys.down.isDown) {
      this.speed -= 1;
    }
    if (this.keys.up.isDown) {
      this.speed += 1;
    }

    this.snake1.update();
    this.snake2.update();
  }
}
