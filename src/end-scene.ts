import Store from "./store";

export default class EndScene extends Phaser.Scene {
    public static KEY: string = "EndScene";
    keys: {
        r: Phaser.Input.Keyboard.Key,
        c: Phaser.Input.Keyboard.Key
    };

    store: Store = new Store();

    constructor() {
        super({
            key: EndScene.KEY,
            active: false,
            visible: true
        });
    }

    update() {
        if (this.keys.r.isDown) {
            const gameScene = this.scene.get('GameScene');
            this.scene.stop();
            gameScene.scene.restart();
        }
        if (this.keys.c.isDown) {
            this.store.clear();
        }
    }

    create() {
        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        this.keys = {
            r: this.input.keyboard.addKey("r"),
            c: this.input.keyboard.addKey("c")
        };

        this.add.text(centerX, 50, "HIGH SCORE", { fontSize: 30 })
            .setColor("#FF0000")
            .setOrigin(0.5, 0);

        this.add.text(centerX, this.cameras.main.height - 50, "Press 'R' for restart", { fontSize: 10 }).setOrigin(0.5, 1);

        this.store.readScores().then(players => {
            players.forEach((player, index) => {
                this.add.text(centerX, 100 + 20 * index, `${player.name}:`)
                    .setOrigin(1, 0);

                this.add
                    .text(centerX + 10, 100 + 20 * index, `${player.score}`)
            });
        });
    }
}