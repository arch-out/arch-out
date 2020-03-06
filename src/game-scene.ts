import * as Phaser from "phaser";
import { BoardSize, Viewport } from "./types";
import { Snake } from "./snake";

const boardSize: BoardSize = {
  width: 800,
  height: 600
};

export default class GameScene extends Phaser.Scene {
  public static KEY: string = "GameScene";

  constructor(viewport: Viewport) {
    super({
      key: GameScene.KEY,
      active: false,
      visible: true,
      physics: {
        default: "arcade",
        arcade: {}
      }
    });
    this.viewport = viewport;
  }

  viewport: Viewport;

  history: Phaser.GameObjects.GameObject[] = [];
  tail: Phaser.GameObjects.GameObject[] = [];

  graphics: Phaser.GameObjects.Graphics;

  position: {
    x: number;
    y: number;
  } = { x: 300, y: 300 };

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
    this.cameras.main.setViewport(
      this.viewport.x,
      this.viewport.y,
      this.viewport.width,
      this.viewport.height
    );
    this.cameras.main.setBackgroundColor(0x333333);

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
