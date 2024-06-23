import * as ex from "excalibur";
import {backgroundMusic} from "./startscreen.js";
let effect3 = new ex.Sound('src/music/mixkit-arcade-retro-game-over-213.wav');
effect3.load();

export class EndScreen extends ex.Scene {
    score;
    playerId;

    constructor(score, playerId) {
        super({});
        this.score = score;
        this.playerId = playerId;
    }

    onInitialize(engine) {
        effect3.play();
        backgroundMusic.stop();
        const gameOverLabel = new ex.Label({
            text: 'GAME OVER',
            font: new ex.Font({
                family: 'CustomFont',
                size: 100,
                unit: ex.FontUnit.Px,
            }),
            fontFamily: 'CustomFont',
            textAlign: ex.TextAlign.Center,
            color: ex.Color.White,
            pos: new ex.Vector(400, 300),
        });

        const scoreLabel = new ex.Label({
            text: `Goals: ${this.score} Suiiiii`,
            font: new ex.Font({
                family: 'CustomFont',
                size: 40,
                unit: ex.FontUnit.Px,
            }),
            color: ex.Color.White,
            textAlign: ex.TextAlign.Center,
            pos: new ex.Vector(590, 400),
        });

        const retryButton = new ex.Label({
            text: 'Retry',
            font: new ex.Font({
                family: 'CustomFont',
                size: 40,
                unit: ex.FontUnit.Px,
            }),
            color: ex.Color.White,
            backgroundColor: ex.Color.Green,
            textAlign: ex.TextAlign.Center,
            pos: new ex.Vector(620, 500),
        });

        this.add(gameOverLabel);
        this.add(scoreLabel);
        this.add(retryButton);

        fetch('https://stud.hosted.hr.nl/1036494/prg4/getScores.php')
            .then(response => response.json())
            .then(data => {
                let scores = Array.isArray(data.scores) ? data.scores : [];

                const playerData = {
                    playerId: this.playerId,
                    score: this.score
                };

                let existingPlayerIndex = -1;
                for (let i = 0; i < scores.length; i++) {
                    if (scores[i].playerId === this.playerId) {
                        existingPlayerIndex = i;
                        break;
                    }
                }

                if (existingPlayerIndex !== -1) {
                    const existingPlayer = scores[existingPlayerIndex];
                    if (existingPlayer.score < this.score) {
                        existingPlayer.score = this.score;
                    }
                } else {
                    scores.push(playerData);
                }

                saveScoresToServer({ scores });

            })
            .catch(error => {
                console.error('Error loading high scores:', error);
            });

        function saveScoresToServer(scores) {
            const jsonString = JSON.stringify(scores);

            fetch('https://stud.hosted.hr.nl/1036494/prg4/saveScores.php', {
                method: 'POST',
                body: jsonString,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        console.log(response);
                        console.log('High scores saved successfully.');
                    } else {
                        console.error('Failed to save high scores:', response.status, response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error saving high scores:', error);
                });
        }

        engine.input.pointers.primary.on('up', (evt) => {
            location.reload();
        });
    }
}