import { v4 as uuidv4 } from 'uuid'
import { Controls } from './types';

export default class Player {
  score: number;
  name: string;
  controls: Controls;
  color: Phaser.Display.Color;
  uuid: uuidv4;

  constructor(name: string, controls: Controls) {
    this.score = 0;
    this.controls = controls;
    this.name = name;
    this.color = new Phaser.Display.Color().random(100);
    this.uuid = uuidv4();
  }
}
