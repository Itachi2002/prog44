import * as ex from "excalibur";
import { Resources } from "./resources.js";
import { Background } from "./background.js";
import { Character } from "./character.js";

export class Sliding extends ex.Actor {
    benchAnimations = [];
    constructor(scene, posX, posY, health) {
        super({

            pos: new ex.Vector(posX, posY),
            collider: ex.Shape.Box(300, 600, ex.Vector.Half, ex.vec(0, 200)),
            collisionType: ex.CollisionType.Active
        });

        this.scene = scene;
        this.health = health;
        this.collided = false;

        let bench = Resources.bench.toSprite();
        this.graphics.use(bench);
        this.scale.setTo(0.5, 0.5);
    }

    onInitialize() {
        let bench = Resources.bench.toSprite();

        let benchDeadSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[2],
            grid: {
                rows: 1,
                columns: 8,
                spriteHeight: 2000,
                spriteWidth: 2048
            }
        })
        this.benchAnimations['playerDeathAnimation'] = ex.Animation.fromSpriteSheet(benchDeadSheet, ex.range(0, 8), 100, ex.Animation.Freeze)
        this.benchAnimations['playerDeathAnimation'].scale.setTo(0.25, 0.25)

        this.on('precollision', (event) => this.onPreCollision(event));
        this.scene.add(this);
    }

    update(engine, delta) {
        super.update(engine, delta);
        const backgroundVelocity = engine.currentScene.actors.find((actor) => actor instanceof Background)?.vel;

        if (backgroundVelocity) {
            this.pos.x += backgroundVelocity.x * delta / 500;
        }
        const checkOffScreen = () => {
            if (this.isOffScreen) {
                this.kill();
            }
        };

        setTimeout(checkOffScreen, 500);
    }

    onPreCollision(event) {
        if (event.other instanceof Character && !this.collided) {
            this.graphics.use(this.benchAnimations['playerDeathAnimation']);

            this.health.loseHealth();
            this.collided = true;
        }
    }

}
