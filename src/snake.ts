import { Viewport } from "./types";
import Player from "./player";

const size = 5;
const speed = 3;

export class Snake extends Phaser.GameObjects.Arc {
  graphics: Phaser.GameObjects.Graphics;
  history: Phaser.GameObjects.GameObject[] = [];

  angle = 0;
  dead = false;

  head: Phaser.GameObjects.Rectangle;
  oldPaths: Phaser.Curves.Path[] = [];
  currentPath: Phaser.Curves.Path;

  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;

  lastCollidable: Phaser.GameObjects.GameObject;
  lastSelfCollidable: Phaser.GameObjects.GameObject;

  player: Player;
  creatingHole: boolean = false;
  holeSize: number = 0;
  viewport: Viewport;

  constructor(
    scene: Phaser.Scene,
    player: Player,
    x: number,
    y: number,
    keyLeft: string,
    keyRight: string,
    viewport: Viewport
  ) {
    super(scene, 0);

    this.player = player;

    this.graphics = scene.add.graphics();

    this.head = scene.add.circle(x, y, size, player.color.color);
    this.currentPath = scene.add.path(x, y);
    scene.physics.add.existing(this.head);

    this.left = scene.input.keyboard.addKey(keyLeft);
    this.right = scene.input.keyboard.addKey(keyRight);

    this.viewport = viewport;
  }

  setDead() {
    this.dead = true;
  }

  createHole() {
    this.creatingHole = true;
    this.holeSize = 0;
    this.oldPaths.push(this.currentPath);
    this.currentPath = null;
    this.lastCollidable?.destroy();
    this.lastSelfCollidable?.destroy();
  }

  stopCreatingHole() {
    this.creatingHole = false;
    this.holeSize = 0;
    this.currentPath = this.scene.add.path(this.head.x, this.head.y);
  }

  update() {
    if (this.dead) {
      return;
    }

    this.player.score++;

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

    if (!this.creatingHole) {
      const random = Math.floor(Math.random() * 100);

      if (random === 7) {
        this.createHole();
      }
    }

    if (this.creatingHole) {
      this.holeSize++;
    } else {
      // Add colliders
      const collidable = this.scene.add.circle(
        this.head.x,
        this.head.y,
        size * 0.5
      );
      this.scene.physics.add.existing(collidable);
      this.history.push(collidable);
      this.lastCollidable = collidable;

      if (this.history.length > 15) {
        this.lastSelfCollidable = this.history.shift();
      }
    }

    this.graphics.lineStyle(size * 2, this.player.color.color, 0.3);

    this.oldPaths.forEach(path => {
      path.draw(this.graphics);
    });

    if (this.creatingHole && this.holeSize > 10) {
      this.stopCreatingHole();
    }

    if (this.currentPath) {
      this.currentPath.lineTo(this.head.x, this.head.y);
      this.currentPath.draw(this.graphics);
    }

    if (
      this.head.x >= this.viewport.width ||
      this.head.x <= 0 ||
      this.head.y >= this.viewport.height ||
      this.head.y <= 0
    ) {
      this.setDead();
    }
  }
}
