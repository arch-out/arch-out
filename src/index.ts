import * as Phaser from "phaser";

const boardSize = {
  width: 800,
  height: 600
};

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
  scene: {
    create: create,
    update: update
  },
  backgroundColor: 0x333333
};
new Phaser.Game(config);

let graphics;

let position: {
  x: number;
  y: number;
};
let angle: number;
let speed = 5;
let keys: {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
};

function create(this: Phaser.Scene) {
  graphics = this.add.graphics();

  this.input.enabled = true;
  position = {
    x: 100,
    y: 100
  };
  angle = 0;

  keys = {
    left: this.input.keyboard.addKey("LEFT"),
    right: this.input.keyboard.addKey("RIGHT"),
    down: this.input.keyboard.addKey("DOWN"),
    up: this.input.keyboard.addKey("UP")
  };
}

function update() {
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

  const dx = speed * Math.cos(angle);
  const dy = speed * Math.sin(angle);

  position.x += dx;
  position.y += dy;

  if (
    position.x >= boardSize.width ||
    position.x <= 0 ||
    position.y >= boardSize.height ||
    position.y <= 0
  ) {
    position.x -= dx;
    position.y -= dy;
    speed = 0;
  }

  graphics.fillStyle(0xff0000, 1);
  graphics.fillCircle(position.x, position.y, 12);
}
