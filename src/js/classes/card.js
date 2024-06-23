import * as ex from "excalibur";
import { Resources } from "./resources.js";
import { Background } from "./background.js";
import { Character } from "./character.js";

export class Card extends ex.Actor {
    birdAnimations = [];

    constructor(scene, posX, posY, health) {
        super({
            pos: new ex.Vector(posX, posY),
            collider: ex.Shape.Box(300, 600, ex.Vector.Half, ex.vec(0, 425)),
            collisionType: ex.CollisionType.Active
        });

        this.scene = scene;
        this.health = health;
        this.collided = false;

        let bird = Resources.bird.toSprite();
        this.graphics.use(bird);
        const random = this.randomFloat(0.07, 0.10)
        this.scale.setTo(random, random);

        const birdSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.bird,
            grid: { rows: 1, columns: 6, spriteWidth: 2048, spriteHeight: 2048 }
        });

        let PlayerDeathSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[2],
            grid: {
                rows: 1,
                columns: 8,
                spriteHeight: 2000,
                spriteWidth: 2048
            }
        })
        this.birdAnimations['playerDeathAnimation'] = ex.Animation.fromSpriteSheet(PlayerDeathSheet, ex.range(0, 8), 100, ex.Animation.Freeze)
        bird = ex.Animation.fromSpriteSheet(birdSheet, ex.range(1, 6), 150);
        bird.flipHorizontal = true;
        this.graphics.use(bird);
    }
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    onInitialize() {
        this.on('precollision', (event) => this.onPreCollision(event));
        this.scene.add(this);
    }

    update(engine, delta) {
        super.update(engine, delta);
        const backgroundVelocity = engine.currentScene.actors.find((actor) => actor instanceof Background)?.vel;

        if (backgroundVelocity) {
            this.pos.x += backgroundVelocity.x * delta / 1000;
        }
        const checkOffScreen = () => {
            if (this.isOffScreen) {
                this.kill();
            }
        };

        // Set a timeout of 500 milliseconds before checking isOffScreen
        setTimeout(checkOffScreen, 500);
    }

    onPreCollision(event) {
        if (event.other instanceof Character && !this.collided) {
            this.graphics.use(this.birdAnimations['playerDeathAnimation']);
            this.health.loseHealth();
            this.collided = true;
        }
    }

}
