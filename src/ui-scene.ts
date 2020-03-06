import { Viewport } from "./types";
import Player from "./player";

export default class UiScene extends Phaser.Scene {
  public static KEY: string = "UiScene";

  viewport: Viewport;
  graphics: Phaser.GameObjects.Graphics;
  players: Player[];
  texts: Phaser.GameObjects.Text[];

  constructor(viewport: Viewport, players: Player[]) {
    super({
      key: UiScene.KEY,
      active: false,
      visible: true
    });
    this.viewport = viewport;
    this.players = players;
  }

  create() {
    this.cameras.main.setBackgroundColor(0x000000);
    this.cameras.main.setViewport(
      this.viewport.x,
      this.viewport.y,
      this.viewport.width,
      this.viewport.height
    );
    this.graphics = this.add.graphics();
    this.texts = this.players.map((player, i) => {
      const text = this.add.text(50, 50 + 20 * i, "");
      text.setColor(player.color.rgba);
      return text;
    });
  }

  update() {
    this.graphics.clear();

    this.players.forEach((player, i) => {
      this.texts[i].setText(`${player.name}: ${player.score}`);
    });
  }
}
