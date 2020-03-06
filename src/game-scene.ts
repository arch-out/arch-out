import * as Phaser from "phaser";
import { BoardSize, Viewport } from "./types";
import { Snake } from "./snake";
import Player from "./player";
import UiScene from "./ui-scene";

const boardSize: BoardSize = {
  width: 800,
  height: 600
};

const controls = [
  { left: "LEFT", right: "RIGHT" },
  { left: "a", right: "s" },
  { left: "v", right: "b" },
  { left: "p", right: "å" }
];

export default class GameScene extends Phaser.Scene {
  public static KEY: string = "GameScene";

  players: Player[];
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

  constructor(viewport: Viewport, players: Player[]) {
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
    this.players = players;
  }

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

    this.snakes = this.players.map(
      (player, i) =>
        new Snake(
          this,
          player,
          100 + i * 100,
          100 + i * 100,
          controls[i].left,
          controls[i].right,
          boardSize
        )
    );

    this.scene.launch(UiScene.KEY);
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

    this.snakes.forEach((snake, snakeIndex, array) => {
      if (snake.dead) {
        return;
      }

      array
        .filter((_, i) => i !== snakeIndex)
        .map(s => s.lastCollidable)
        .concat(snake.lastSelfCollidable ? [snake.lastSelfCollidable] : [])
        .forEach(collidable => {
          this.physics.add.collider(snake.head, collidable, () =>
            snake.setDead()
          );
        });
    });
  }
}
