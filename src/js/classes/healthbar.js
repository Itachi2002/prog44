import * as ex from "excalibur";
import { EndScreen } from "./endscreen.js";

export class HealthBar extends ex.ScreenElement {
    healthrectangle;
    borderrectangle;
    gameInstance;
    constructor(game) {
        super();
        this.gameInstance = game;

        this.healthrectangle = new ex.Rectangle({
            width: 400,
            height: 30,
            color: ex.Color.Red,
        });

        // Create the border rectangle
        this.borderrectangle = new ex.Rectangle({
            width: this.healthrectangle.width + 5,
            height: this.healthrectangle.height + 5,
            color: ex.Color.Black,
        });

        this.pos = new ex.Vector((1400 - this.healthrectangle.width) / 2, 50);

        this.graphics.add(this.borderrectangle);
        this.graphics.add(this.healthrectangle);
    }

    resetHealth() {
        this.healthrectangle.width = 400;
    }

    loseHealth() {
        console.log(this.healthrectangle.width);
        if (this.healthrectangle.width <= 0) {
            console.log('game over');
            const endgame = new EndScreen(this.gameInstance.savedData.getScore(), this.gameInstance.savedData.getUserId());
            this.gameInstance.add('gameover', endgame);
            this.gameInstance.goToScene('gameover');
            this.gameInstance.stopGame();
        } else {
            this.healthrectangle.width -= 50;
        }
    }
}
