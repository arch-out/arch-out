export class BasePhaserPlugin extends Phaser.Plugins.BasePlugin {
  displayList: Phaser.GameObjects.DisplayList;
  scene: Phaser.Scene;
}

export type SnakeCreator = (
  x: number,
  y: number,
  keyLeft: string,
  keyRight: string
) => Phaser.GameObjects.GameObject;

export class GameObjectFactoryWithPlugins extends Phaser.GameObjects
  .GameObjectFactory {
  snake: SnakeCreator;
}

export class PhaserSceneWithPlugins extends Phaser.Scene {
  add: GameObjectFactoryWithPlugins;
}
export type BoardSize = {
  width: number;
  height: number;
};
