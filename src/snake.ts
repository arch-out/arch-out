import { BoardSize } from "./types";

const size = 5;
const speed = 3;

export class Snake extends Phaser.GameObjects.Arc {
  graphics: Phaser.GameObjects.Graphics;
  history: Phaser.GameObjects.GameObject[] = [];

  angle = 0;
  dead = false;

  head: Phaser.GameObjects.Rectangle;
  path: Phaser.Curves.Path;

  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;

  boardSize: BoardSize;

  lastCollidable: Phaser.GameObjects.GameObject;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    keyLeft: string,
    keyRight: string,
    boardSize: BoardSize
  ) {
    super(scene, 0);

    this.graphics = scene.add.graphics();

    this.head = scene.add.circle(x, y, size, 0xffffff);
    this.path = scene.add.path(x, y);
    scene.physics.add.existing(this.head);

    this.left = scene.input.keyboard.addKey(keyLeft);
    this.right = scene.input.keyboard.addKey(keyRight);

    this.boardSize = boardSize;
  }

  setDead() {
    this.dead = true;
  }

  update() {
    if (this.dead) {
      return;
    }

    this.graphics.clear();

    if (this.left.isDown) {
      this.angle -= ((((2 * Math.PI) / 1000) * speed) % 2) * Math.PI;
    }
    if (this.right.isDown) {
      this.angle += ((((2 * Math.PI) / 1000) * speed) % 2) * Math.PI;
    }

    const dx = speed * Math.cos(this.angle);
    const dy = speed * Math.sin(this.angle);

    this.head.x += dx;
    this.head.y += dy;

    this.history.push(this.scene.add.circle(this.head.x, this.head.y, size));
    if (this.history.length > 5) {
      const crashable = this.history.shift();
      this.scene.physics.add.existing(crashable);

      this.lastCollidable = crashable;
    }

    this.graphics.lineStyle(size * 2, 0x00ff00, 0.3);
    this.path.lineTo(this.head.x, this.head.y);
    this.path.draw(this.graphics);

    if (
      this.head.x >= this.boardSize.width ||
      this.head.x <= 0 ||
      this.head.y >= this.boardSize.height ||
      this.head.y <= 0
    ) {
      this.setDead();
    }
  }
}
