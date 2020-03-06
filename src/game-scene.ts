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
  speed: number = 3;
  keys: {
    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  showHitboxes = false;

  path: Phaser.Curves.Path;

  snakes: Snake[] = [];

  create() {
    this.input.enabled = true;
    this.keys = {
      down: this.input.keyboard.addKey("DOWN"),
      up: this.input.keyboard.addKey("UP"),
      d: this.input.keyboard.addKey("d")
    };

    this.snakes.push(new Snake(this, 100, 100, "a", "s", boardSize));
    this.snakes.push(new Snake(this, 200, 200, "v", "b", boardSize));
    this.snakes.push(new Snake(this, 300, 300, "LEFT", "RIGHT", boardSize));
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

    this.snakes.forEach(s => s.update());

    this.snakes.forEach((snake, index, array) => {
      const lastCollidable = snake.lastCollidable;

      const otherLastColliders = array.reduce((acc, curr, i) => {
        if (i !== index) {
          acc.push(curr.lastCollidable);
        }

        return acc;
      }, []);

      otherLastColliders.concat(lastCollidable).forEach(collidable => {
        this.physics.add.collider(snake.head, collidable, () =>
          snake.setDead()
        );
      });
    });
  }
}
