import GameScene from "./game-scene";
import Player from "./player";
import { Controls } from "./types";

export default class PlayerScene extends Phaser.Scene {
    public static KEY: string = "PlayerScene";

    players: Player[] = [];

    controls: Controls[] = [
        {
            left: "LEFT",
            right: "RIGHT"
        },
        {
            left: "a",
            right: "s"
        },
        {
            left: "v",
            right: "b"
        },
        {
            left: "p",
            right: "å"
        }
    ];

    graphics: Phaser.GameObjects.Graphics;

    constructor() {
        super({
            key: PlayerScene.KEY,
            active: false,
            visible: true
        });
    }

    create() {
        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        this.add
            .text(centerX, centerY - 90, "ADD PLAYER")
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.addPlayer());

        this.add
            .text(centerX, centerY + 90, "START GAME")
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.startGame());
    }

    addPlayer() {
        const playerIndex = this.players.length;

        const playerName = window.prompt("Please enter your name:");

        if (playerName) {
            const player = new Player(playerName, this.controls[playerIndex]);

            const centerX = this.cameras.main.centerX;
            const centerY = this.cameras.main.centerY;

            this.add.rectangle(centerX - 20, centerY - 60 + 8 + (playerIndex * 20), 10, 10, player.color.color)
            this.add.text(centerX, centerY - 60 + (playerIndex * 20), player.name);
            this.add.text(centerX + 100, centerY - 60 + (playerIndex * 20), `${player.controls.left} ${player.controls.right}`);

            this.players.push(player);
        }
    }

    startGame() {
        this.scene.start(GameScene.KEY, this.players);
    }
}