export default class Player {
  score: number;
  name: string;
  color: Phaser.Display.Color;

  constructor(name: string) {
    this.score = 0;
    this.name = name;
    this.color = new Phaser.Display.Color().random(100);
  }
}
