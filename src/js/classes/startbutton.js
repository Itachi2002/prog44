import * as ex from 'excalibur';

export class StartButton extends ex.Actor {
    label;
    constructor(game) {
        super({
            width: 150,
            height: 50,
            color: ex.Color.Chartreuse
        });
        this.pos = new ex.Vector(700, 500)
        this.gameInstace = game;

    }

    onInitialize(engine) {
        this.on('pointerup', () => {
            console.log("Start button clicked!");
            this.gameInstace.startGame();
        });
    }


}
