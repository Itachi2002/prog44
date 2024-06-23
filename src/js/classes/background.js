import * as ex from "excalibur";
import { Resources } from './resources.js';

export class Background extends ex.Actor {
    offset;
    currentLevel = 0;

    constructor(savedData) {
        super();
        this.savedData = savedData;
    }

    onInitialize(engine) {
        this.pos = new ex.Vector(0, 0);
        this.vel = new ex.Vector(-250, 0);

        // Load the initial background
        this.switchBackground(0);
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x < -this.offset) {
            this.pos = new ex.Vector(0, 0);
        }
    }

    onPreUpdate(_engine, _delta) {
        const scoreLevel = Math.floor(this.savedData.getScore());

        if (scoreLevel !== this.currentLevel) {
            this.switchBackground(scoreLevel);
            this.currentLevel = scoreLevel;
        }
    }

    switchBackground(level) {
        // If level is 0, load the default background

        let backgroundGround = Resources.backgroundGround.toSprite();
        let backgroundSky = Resources.backgroundSky.toSprite();

        let groupSky = new ex.GraphicsGroup({
            members: [
                {
                    graphic: backgroundSky,
                    pos: new ex.Vector(0, 0),
                    vel: new ex.Vector(-50, 0) // Adjust the velocity for slower movement
                },
                {
                    graphic: backgroundSky,
                    pos: new ex.Vector(backgroundSky.width, 0),
                    vel: new ex.Vector(-50, 0) // Adjust the velocity for slower movement
                },
                {
                    graphic: backgroundSky,
                    pos: new ex.Vector(backgroundSky.width * 2, 0),
                    vel: new ex.Vector(-50, 0) // Adjust the velocity for slower movement
                }
            ]
        });
        this.graphics.add(groupSky);

        let spaceImage;
        if (level === 0) {
            spaceImage = Resources.background[this.savedData.getLevel()].toSprite();
        } else {
            if (Resources.background[this.savedData.getLevel()]) {
                spaceImage = Resources.background[this.savedData.getLevel()].toSprite();
            }
        }

        if (spaceImage) {
            this.offset = spaceImage.width;

            let group = new ex.GraphicsGroup({
                members: [
                    {
                        graphic: spaceImage,
                        pos: new ex.Vector(0, 0),
                        vel: new ex.Vector(-100, 0) // Adjust the velocity for slower movement
                    },
                    {
                        graphic: spaceImage,
                        pos: new ex.Vector(spaceImage.width, 0),
                        vel: new ex.Vector(-150, 0) // Adjust the velocity for slower movement
                    },
                    {
                        graphic: spaceImage,
                        pos: new ex.Vector(spaceImage.width * 2, 0),
                        vel: new ex.Vector(-200, 0) // Adjust the velocity for slower movement
                    }
                ]
            });

            this.graphics.anchor = new ex.Vector(0, 0);
            this.graphics.add(group);
        }

        let groupGround = new ex.GraphicsGroup({
            members: [
                {
                    graphic: backgroundGround,
                    pos: new ex.Vector(0, 270),
                    vel: new ex.Vector(-200, 0) // Adjust the velocity for slower movement
                },
                {
                    graphic: backgroundGround,
                    pos: new ex.Vector(backgroundGround.width, 270),
                    vel: new ex.Vector(-200, 0) // Adjust the velocity for slower movement
                },
                {
                    graphic: backgroundGround,
                    pos: new ex.Vector(backgroundGround.width * 2, 270),
                    vel: new ex.Vector(-200, 0) // Adjust the velocity for slower movement
                }
            ]
        });
        this.graphics.add(groupGround);
    }
}
