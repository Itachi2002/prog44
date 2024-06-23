import * as ex from "excalibur";
import {Resources} from "./resources.js";
import {Card} from "./card.js";
import {Sliding} from "./sliding.js";

let effect1 = new ex.Sound('src/music/mixkit-quick-lock-sound-2854.wav');

export class Character extends ex.Actor{
    playerAnminations = []
    playerJumping = false;
    isPlayingSound = false;


    constructor(posX, posY, ) {
        super({
            pos: new ex.Vector(posX, posY),
            collider: ex.Shape.Box(300, 600, ex.Vector.Half, ex.vec(0, 425))
        });
        this.initialPos = new ex.Vector(posX, posY);
        this.resetPlayer();
        this.jumpForce = -300;
        this.flyForce = -500;
        this.gravity = 700;

    }
    onInitialize(_engine) {
    this.on('precollision', (event) => this.onPreCollision(event));
    this.scene.add(this);
      this.playerAnimationsFunction();
    }

    playerAnimationsFunction() {
        let PlayerWalkSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[0],
            grid:{
                rows: 1,
                columns: 8,
                spriteHeight: 2000,
                spriteWidth: 2048
            },
        })
        let PlayerDieSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[3],
            grid: {
                rows: 1,
                columns: 10,
                spriteHeight: 2000,
                spriteWidth: 2048
            }
        })
        let PlayerDeathSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[3],
            grid: {
                rows: 1,
                columns: 8,

                spriteHeight: 2000,
                spriteWidth: 2048
            }
        })
        let PlayerJumpSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[3],
            grid: {
                rows: 1,
                columns: 5,

                spriteHeight: 2000,
                spriteWidth: 2048
            }
        })
        let PlayerHitSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.character[4],
            grid: {
                rows: 1,
                columns: 8,

                spriteHeight: 2000,
                spriteWidth: 2048
            }
        })

        this.playerAnminations['playerWalkAnimation'] = ex.Animation.fromSpriteSheet(PlayerWalkSheet, ex.range(1,7), 100);
        this.playerAnminations['playerDieAnimation'] = ex.Animation.fromSpriteSheet(PlayerDieSheet, ex.range(1,10), 300)
        this.playerAnminations['playerDeathAnimation'] = ex.Animation.fromSpriteSheet(PlayerDeathSheet, ex.range(0, 8), 150, ex.Animation.Freeze)
        this.playerAnminations['playerJumpAnimation'] = ex.Animation.fromSpriteSheet(PlayerJumpSheet, ex.range(0, 9), 200, ex.Animation.Freeze)
        this.playerAnminations['playerHitAnimation'] = ex.Animation.fromSpriteSheet(PlayerHitSheet, ex.range(1, 7), 100)
        this.graphics.use(this.playerAnminations['playerWalkAnimation'])
    }

    onPreUpdate(engine, delta) {

        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space) && !this.isJumping)
        {
            this.playerJumping = true;
            this.graphics.use(this.playerAnminations['playerJumpAnimation'])

            setTimeout(() => {
                this.graphics.use(this.playerAnminations['playerWalkAnimation'])
                this.playerJumping = false;
            }, 700)

        }

        if (engine.input.keyboard.wasPressed(ex.Input.Keys.ArrowUp) && !this.isJumping)
        {
            this.playerJumping = true;
            this.graphics.use(this.playerAnminations['playerJumpAnimation'])

            setTimeout(() => {
                this.graphics.use(this.playerAnminations['playerWalkAnimation'])
                this.playerJumping = false;
            }, 1400)

        }

    }

    onPreCollision(event) {
        if (event.other instanceof Card || event.other instanceof Sliding) {
            if(!this.isPlayingSound){
                this.isPlayingSound = true;
                effect1.load().then(() => {effect1.play(100).then(r => this.isPlayingSound = false)})
            }

            this.graphics.use(this.playerAnminations['playerHitAnimation']);
            setTimeout(() => {
                this.graphics.use(this.playerAnminations['playerWalkAnimation'])
            }, 1400);
        }
    }

    jump() {
        if (!this.isJumping && !this.isFlying) {
            this.vel.y = this.jumpForce;
            this.isJumping = true;
        }
    }

    fly() {
        if (!this.isFlying) {
            this.vel.y = this.flyForce;
            this.isFlying = true;
        }
    }

    resetPlayer() {
        this.pos = this.initialPos.clone();
        this.vel.setTo(0, 0);
        this.isJumping = false;
        this.isFlying = false;
    }

    update(engine, delta) {
        super.update(engine, delta);


        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space) && !this.isJumping && !this.isJumping) {
            this.jump();

        }

        if (engine.input.keyboard.wasReleased(ex.Input.Keys.ArrowUp) && !this.isJumping && !this.isJumping) {
            this.fly();
        }

        if (this.isJumping || this.isFlying) {
            this.vel.y += this.gravity * delta / 1000;
            this.pos.y += this.vel.y * delta / 1000;

            if (this.pos.y >= this.initialPos.y) {
                this.pos.y = this.initialPos.y;
                this.vel.y = 0;
                this.isJumping = false;
                this.isFlying = false;
            }
        }
    }
}

