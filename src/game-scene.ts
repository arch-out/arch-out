import * as Phaser from "phaser";
import { Viewport } from "./types";
import { Snake } from "./snake";
import Player from "./player";
import UiScene from "./ui-scene";
import EndScene from "./end-scene";
import lightning from "./images/lightning.png";
import { Item } from "./item";
import { getRandomInt } from "./utils";

type Position = {
  x: number;
  y: number;
};

const controls = [
  { left: "LEFT", right: "RIGHT" },
  { left: "a", right: "s" },
  { left: "v", right: "b" },
  { left: "p", right: "å" },
];

export default class GameScene extends Phaser.Scene {
  public static KEY: string = "GameScene";

  players: Player[];
  viewport: Viewport;

  history: Phaser.GameObjects.GameObject[] = [];
  tail: Phaser.GameObjects.GameObject[] = [];

  items: Item[] = [];

  graphics: Phaser.GameObjects.Graphics;

  position: Position = { x: 300, y: 300 };

  angle: number = 0;
  speed: number = 3;
  keys: {
    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    r: Phaser.Input.Keyboard.Key;
  };
  showHitboxes = false;

  path: Phaser.Curves.Path;

  snakes: Snake[] = [];
  startTime: number;
  countdown: {
    text: Phaser.GameObjects.Text;
    size: number;
    startTime: number;
    color: string;
  };

  constructor(viewport: Viewport, players: Player[]) {
    super({
      key: GameScene.KEY,
      active: false,
      visible: true,
      physics: {
        default: "arcade",
        arcade: {},
      },
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
      d: this.input.keyboard.addKey("d"),
      r: this.input.keyboard.addKey("r"),
    };

    const positions = this.players.map(() => ({
      x: getRandomInt(50, this.viewport.width - 50),
      y: getRandomInt(50, this.viewport.height - 50),
    }));

    this.snakes = this.players.map(
      (player, i) =>
        new Snake(
          this,
          player,
          positions[i].x,
          positions[i].y,
          controls[i].left,
          controls[i].right,
          this.viewport
        )
    );

    this.countdown = {
      text: this.add.text(200 - 100, 300 - 500 / 2, "", {}),
      size: 500,
      startTime: Date.now(),
      color: "#f0f",
    };

    this.scene.launch(UiScene.KEY);
  }

  reset() {
    const aliveSnakes = this.snakes.filter((f) => !f.dead);

    if (aliveSnakes.length === 0) {
      this.scene.restart();
    }
  }

  preload() {
    this.load.image("lightning", lightning);
  }

  addItem() {
    this.items.push(new Item(this, "lightning", this.viewport));
  }

  update() {
    if (!this.showHitboxes && this.keys.d.isDown) {
      this.showHitboxes = true;
      this.physics.world.createDebugGraphic();
    }

    if (this.keys.r.isDown) {
      this.reset();
    }

    this.countdown.text.setText(`${3 - Math.floor(elapsed)}`);
    var elapsed = Date.now() - this.countdown.startTime;
    if (elapsed / 1000 < 3) {
      this.countdown.size = 100 * (3 - elapsed / 1000) + 200;

      this.countdown.text.setText(`${3 - Math.floor(elapsed / 1000)}`);
      this.countdown.text.setColor(this.countdown.color);
      this.countdown.text.setFontSize(this.countdown.size);
      this.countdown.text.setPosition(
        200 - this.countdown.size / 4,
        300 - this.countdown.size / 2
      );
      return;
    }

    if (getRandomInt(1, 500) === 1 && this.items.length < 4) {
      this.addItem();
    }

    this.countdown.text.destroy();

    if (this.keys.down.isDown) {
      this.speed -= 1;
    }
    if (this.keys.up.isDown) {
      this.speed += 1;
    }

    this.snakes.forEach((s) => s.update());

    this.snakes.forEach((snake, snakeIndex, array) => {
      if (snake.dead) {
        return;
      }

      array
        .filter((_, i) => i !== snakeIndex)
        .map((s) => s.lastCollidable)
        .concat(snake.lastSelfCollidable ? [snake.lastSelfCollidable] : [])
        .forEach((collidable) => {
          this.physics.add.collider(snake.head, collidable, () =>
            snake.setDead()
          );

          this.items.forEach((item) => {
            this.physics.add.collider(snake.head, item.collidable, () => {
              this.items = this.items.filter((i) => i !== item);
              item.destroy();

              this.snakes.forEach((s) => {
                if (s === snake) {
                  return;
                }

                s.setSpeed(5);
                setTimeout(() => {
                  snake.setSpeed(3);
                }, 5000);
              });
            });
          });
        });
    });

    if (this.gameover()) {
      this.scene.switch(EndScene.KEY);
    }
  }

  gameover(): boolean {
    return this.snakes.every((s) => s.dead);
  }
}
