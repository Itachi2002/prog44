import * as ex from "excalibur";
import { Resources } from "./resources.js";
import { Background } from "./background.js";
import { Character } from "./character.js";

let effect2 = new ex.Sound('src/music/mixkit-fairy-arcade-sparkle-866.wav');

export class Ball extends ex.Actor {
    bookAnimations = [];

    constructor(scene, posX, posY, health, savedData, engine) {
        super({
            pos: new ex.Vector(posX, posY),
            collisionType: ex.CollisionType.Active,
            collider: ex.Shape.Box(100, 100, ex.Vector.Half, ex.vec(0, 0))
        });

        this.scene = scene;
        this.health = health;
        this.collided = false;
        this.savedData = savedData;
        this.engine = engine
        let book = Resources.book.toSprite();
        book.scale = new ex.vec(0.1, 0.1)
        // this.graphics.use(book);

        const bookParticle = ex.SpriteSheet.fromImageSource({
            image: Resources.bookParticle,
            grid: { rows: 1, columns: 8, spriteWidth: 1184, spriteHeight: 1184 }
        });

        this.bookAnimations['bookParticle'] = ex.Animation.fromSpriteSheet(bookParticle, ex.range(1, 8), 100);
        this.bookAnimations['bookParticle'].scale.setTo(0.14, 0.14);
        this.graphics.use(this.bookAnimations['bookParticle']);

        const bookSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.bookParticles,
            grid: { rows: 1, columns: 3, spriteWidth: 2000, spriteHeight: 2048 }
        });

        this.bookAnimations['bookAnimation'] = ex.Animation.fromSpriteSheet(bookSheet, ex.range(1, 3), 100);
        this.bookAnimations['bookAnimation'].scale.setTo(0.08, 0.08);
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
            effect2.load().then(() => {effect2.play(100).then()})
            this.graphics.use(this.bookAnimations['bookAnimation']);
            this.savedData.setScore(this.engine);
            this.collided = true;
        }
    }

}
