import { Viewport } from "~types";
import { getRandomInt } from "./utils";

export class Item extends Phaser.GameObjects.GameObject {
  collidable: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, texture: string, viewport: Viewport) {
    super(scene, "Item");

    var coordX = getRandomInt(0, viewport.width);
    var coordY = getRandomInt(0, viewport.height);

    this.collidable = scene.add.image(coordX, coordY, texture);
    this.collidable.setScale(0.2, 0.2);

    this.scene.physics.add.existing(this.collidable);
  }

  destroy() {
    this.collidable.destroy();
    this.collidable = null;
  }
}
