import * as ex from "excalibur";
import {StartButton} from "./startbutton.js";
export let backgroundMusic = new ex.Sound("src/music/backgroundMusic.mp3");
backgroundMusic.load();
export class StartScreen extends ex.Scene {
    highScore = 'Start Playing :)';
    constructor(game, playerId, score) {
        super();
        this.gameInstance = game;
        this.userScore = null;
        this.playerId = playerId;
        this.score = score;
    }

    onInitialize(engine) {
        const welcomeLabel = new ex.Label({
            text: 'Welcome!',
            font: new ex.Font({
                family: 'CustomFont',
                size: 100,
                unit: ex.FontUnit.Px,
            }),
            fontFamily: 'CustomFont',
            textAlign: ex.TextAlign.Center,
            color: ex.Color.White,
            pos: new ex.Vector(450, 300),
        });

        const scoreLabel = new ex.Label({
            text: `${this.highScore}`,
            font: new ex.Font({
                family: 'CustomFont',
                size: 40,
                unit: ex.FontUnit.Px,
            }),
            color: ex.Color.White,
            textAlign: ex.TextAlign.Center,
            pos: new ex.Vector(300, 400),
        });

        this.label = new ex.Label({
            text: "Start",
            color: ex.Color.Black,
            font: new ex.Font({
                size: 20,
                family: 'CustomFont',
                unit: ex.FontUnit.Px
            }),
            pos: new ex.vec(665, 505)
        });
        this.add(welcomeLabel);
        this.add(scoreLabel);
        this.add(new StartButton(this.gameInstance))
        this.add(this.label);

        fetch('https://stud.hosted.hr.nl/1036494/prg4/getScores.php')
            .then(response => response.json())
            .then(data => {
                let scores = Array.isArray(data.scores) ? data.scores : [];


                let existingPlayerIndex = -1;
                for (let i = 0; i < scores.length; i++) {
                    if (scores[i].playerId === this.playerId) {
                        existingPlayerIndex = i;
                        break;
                    }
                }

                if (existingPlayerIndex !== -1) {
                    backgroundMusic.loop = true;
                    backgroundMusic.play();
                    const existingPlayer = scores[existingPlayerIndex];
                    scoreLabel.text = `Your High Score: ${existingPlayer.score}`;
                    scoreLabel.pos = new ex.Vector(480, 400)
                    welcomeLabel.text = 'Welcome back!';
                    welcomeLabel.pos = new ex.Vector(300, 300)
                }
            })
            .catch(error => {
                console.error('Error loading high scores:', error);
            });

    }
}
