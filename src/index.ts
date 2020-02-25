import * as Phaser from "phaser";

type Position = {
  x: number;
  y: number;
};

const boardSize = {
  width: 800,
  height: 600
};
const size = 10;

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
  scene: {
    create: create,
    update: update
  },
  backgroundColor: 0x333333,
  physics: {
    default: "arcade",
    matter: {
      debug: true,
      gravity: false
    },
    arcade: {}
  }
};
const game = new Phaser.Game(config);

let history: Phaser.GameObjects.GameObject[] = [];
let tail: Phaser.GameObjects.GameObject[] = [];

let graphics: Phaser.GameObjects.Graphics;

let position: {
  x: number;
  y: number;
};
let angle: number;
let speed = 4;
let keys: {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  d: Phaser.Input.Keyboard.Key;
};
let head: Phaser.GameObjects.Rectangle;

let path: Phaser.Curves.Path;

function create(this: Phaser.Scene) {
  graphics = this.add.graphics();

  graphics.lineStyle(size, 0x00ff00, 0.3);

  this.input.enabled = true;
  position = {
    x: 100,
    y: 100
  };
  angle = 0;

  path = this.add.path(position.x, position.y);

  keys = {
    left: this.input.keyboard.addKey("LEFT"),
    right: this.input.keyboard.addKey("RIGHT"),
    down: this.input.keyboard.addKey("DOWN"),
    up: this.input.keyboard.addKey("UP"),
    d: this.input.keyboard.addKey("d")
  };

  head = this.add.rectangle(position.x, position.y, size, size, 0xffffff);

  this.physics.add.existing(head);
}

function update(this: Phaser.Scene) {
  graphics.clear();

  if (keys.left.isDown) {
    angle -= ((((2 * Math.PI) / 1000) * speed) % 2) * Math.PI;
  }
  if (keys.right.isDown) {
    angle += ((((2 * Math.PI) / 1000) * speed) % 2) * Math.PI;
  }
  if (keys.down.isDown) {
    speed -= 1;
  }
  if (keys.up.isDown) {
    speed += 1;
  }
  if (keys.d.isDown) {
    this.physics.world.createDebugGraphic();
  }

  const dx = speed * Math.cos(angle);
  const dy = speed * Math.sin(angle);

  head.x += dx;
  head.y += dy;

  history.push(this.add.rectangle(head.x, head.y, size, size));
  if (history.length > 8) {
    const crashable = history.shift();
    tail.push(crashable);

    this.physics.add.existing(crashable);
    this.physics.add.collider(head, crashable, () => console.log("Yaaaay!!"));
  }

  graphics.lineStyle(size, 0x00ff00, 0.3);
  path.lineTo(head.x, head.y);
  path.draw(graphics);

  if (
    head.x >= boardSize.width ||
    head.x <= 0 ||
    head.y >= boardSize.height ||
    head.y <= 0
  ) {
    head.x -= dx;
    head.y -= dy;
    speed = 0;
  }
}
