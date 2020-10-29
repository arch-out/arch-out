import { v4 as uuidv4 } from 'uuid'

export default class Player {
  score: number;
  name: string;
  color: Phaser.Display.Color;
  uuid: uuidv4;

  constructor(name: string) {
    this.score = 0;
    this.name = name;
    this.color = new Phaser.Display.Color().random(100);
    this.uuid = uuidv4();
  }
}
