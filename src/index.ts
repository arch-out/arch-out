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
let direction: {
  dx: number;
  dy: number;
};

function create() {
  graphics = this.add.graphics();

  position = {
    x: 100,
    y: 100
  };
  direction = {
    dx: 10,
    dy: 5
  };
}

function update() {
  graphics.clear();

  position.x += direction.dx;
  position.y += direction.dy;

  if (position.x >= boardSize.width || position.x <= 0) {
    direction.dx *= -1;
    position.x += direction.dx;
  }
  if (position.y >= boardSize.height || position.y <= 0) {
    direction.dy *= -1;
    position.y += direction.dy;
  }

  graphics.fillStyle(0xff0000, 1);
  graphics.fillCircle(position.x, position.y, 12);
}
