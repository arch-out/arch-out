import * as Phaser from "phaser";

const boardSize = {
  width: 800,
  height: 600
};
const size = 5;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key:'gameScene',
      active: false,
      visible: false,
      physics: {
        default: "arcade",
        arcade: {}
      }
    });
  }

  history: Phaser.GameObjects.GameObject[] = [];
  tail: Phaser.GameObjects.GameObject[] = [];

  graphics: Phaser.GameObjects.Graphics;

  position: {
    x: number;
    y: number;
  } = { x: 100, y: 100 };
  angle: number = 0;
  speed: number = 5;
  keys: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };
  head: Phaser.GameObjects.Rectangle;
  showHitboxes = false;
  dead = false;

  path: Phaser.Curves.Path;

  create() {
    this.graphics = this.add.graphics();
    this.input.enabled = true;
    this.path = this.add.path(this.position.x, this.position.y);
    this.keys = {
      left: this.input.keyboard.addKey("LEFT"),
      right: this.input.keyboard.addKey("RIGHT"),
      down: this.input.keyboard.addKey("DOWN"),
      up: this.input.keyboard.addKey("UP"),
      d: this.input.keyboard.addKey("d")
    };
    this.head = this.add.circle(
      this.position.x,
      this.position.y,
      size,
      0xffffff
    );
    this.physics.add.existing(this.head);
  }
  update() {
    if (!this.showHitboxes && this.keys.d.isDown) {
      this.showHitboxes = true;
      this.physics.world.createDebugGraphic();
    }
    if (this.dead) {
      return;
    }
    this.graphics.clear();
    if (this.keys.left.isDown) {
      this.angle -= ((((2 * Math.PI) / 1000) * this.speed) % 2) * Math.PI;
    }
    if (this.keys.right.isDown) {
      this.angle += ((((2 * Math.PI) / 1000) * this.speed) % 2) * Math.PI;
    }
    if (this.keys.down.isDown) {
      this.speed -= 1;
    }
    if (this.keys.up.isDown) {
      this.speed += 1;
    }
    const dx = this.speed * Math.cos(this.angle);
    const dy = this.speed * Math.sin(this.angle);
    this.head.x += dx;
    this.head.y += dy;

    this.history.push(this.add.circle(this.head.x, this.head.y, size));
    if (this.history.length > this.speed) {
      const crashable = this.history.shift();
      this.physics.add.existing(crashable);
      this.physics.add.collider(this.head, crashable, () => (this.dead = true));
    }

    this.graphics.lineStyle(size * 2, 0x00ff00, 0.3);
    this.path.lineTo(this.head.x, this.head.y);
    this.path.draw(this.graphics);

    if (
      this.head.x >= boardSize.width ||
      this.head.x <= 0 ||
      this.head.y >= boardSize.height ||
      this.head.y <= 0
    ) {
      this.dead = true;
    }
  }
}
