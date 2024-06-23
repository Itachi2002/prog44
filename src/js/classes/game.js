import '../../css/style.css'
import * as ex from 'excalibur';
import { Resources, ResourceLoader } from './resources.js'
import {Character} from "./character.js";
import {DevTool} from "@excaliburjs/dev-tools";
import {Damage} from "./damage.js";
import {SavedData} from "./saveddata.js";
import {StartScreen} from "./startscreen.js";
import {Background} from "./background.js";
import {Points} from "./points.js";
import {HealthBar} from "./healthbar.js";
import {Arcade} from "../../arcade/arcade.js";

export class Game extends ex.Engine {
    #arcade;
    #joystickListener;

    savedData = new SavedData();
    points = new Points();
    timerLabel = new ex.Label("");
    levelLabel = new ex.Label("");

    constructor() {
        super({ width: 1400, height: 730 });
        this.start(ResourceLoader).then(() => {

            let userId = localStorage.getItem('userId');
            if (!userId) {
                userId = Math.random().toString(36).substring(7);
                localStorage.setItem('userId', userId);
            }
            this.savedData.setUserId(userId);

            const startScreen = new StartScreen(this, this.savedData.getUserId())

            this.add('startscreen', startScreen);
            this.goToScene('startscreen');
        });
        this.#arcade = new Arcade(this, true, false)

    }

    startGame() {
        const background = new Background(this.savedData);
        this.add(background);
        this.add(this.points);

        const health = new HealthBar(this); // Pass the game instance to the HealthBar constructor
        this.add(health);

        const character = new Character(400, 520, this.#arcade);
        this.add(character);
        character.scale.setTo(0.15, 0.15)

        const spawner = new Damage(health, this.savedData);
        this.add(spawner);

        const customFont = new ex.Font({
            family: 'CustomFont',
            size: 13,
            unit: ex.FontUnit.Px
        });

        const customFont2 = new ex.Font({
            family: 'CustomFont',
            size: 13,
            unit: ex.FontUnit.Px
        });

        this.levelLabel.font = customFont;
        this.levelLabel.textAlign = ex.TextAlign.Right;
        this.levelLabel.color = ex.Color.fromHex("#D2691E");
        this.levelLabel.pos.setTo(50, 70);

        this.add(this.levelLabel);

        this.timerLabel.font = customFont2;
        this.timerLabel.textAlign = ex.TextAlign.Right;
        this.timerLabel.color = ex.Color.fromHex("#D2691E");
        this.timerLabel.pos.setTo(this.drawWidth - 110, 70);

        this.add(this.timerLabel);
    }

    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.timerLabel.text = `: ${this.savedData.getScore()}`;
        this.levelLabel.text = `Level: ${this.savedData.getLevel()}`;
        this.timerLabel.scale.setTo(3, 3);
        this.levelLabel.scale.setTo(3, 3);
        this.update()
    }

    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail]

        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        this.update();
    }

    update() {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update();
        }

        requestAnimationFrame(() => this.update());
    }

    disconnect() {
        document.removeEventListener("joystickcreated", this.#joystickListener)
    }

    stopGame() {
        console.log("start de game!")
    }
}

new DevTool(new Game())
