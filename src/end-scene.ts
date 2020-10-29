
export default class EndScene extends Phaser.Scene {
    public static KEY: string = "EndScene";
    keys: {
        r: Phaser.Input.Keyboard.Key;
    };

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
    }

    create() {
        var centerX = this.cameras.main.centerX;
        var centerY = this.cameras.main.centerY;

        this.keys = {
            r: this.input.keyboard.addKey("r")
        };

        this.add.text(centerX, centerY, "Press 'R' for restart", {
            fontSize: 10,
        }).setOrigin(0.5);
    }
}