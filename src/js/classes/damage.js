import * as ex from "excalibur";
import {Card} from "./card.js";
import {Ball} from "./ball.js";
import {Sliding} from "./sliding.js";

export class Damage extends ex.Actor {
    constructor(health, savedData) {
        super();
        this.random = new ex.Random(1337);
        this.delay = 2000;
        this.minDelay = 3000;
        this.maxDelay = 4000;
        this.health = health;
        this.savedData = savedData
    }

    onInitialize(engine) {
        this.timer = new ex.Timer({
            fcn: () => this.spawn(engine),
            interval: this.delay,
            repeats: true,
        });
        engine.currentScene.add(this.timer);
        this.timer.start();
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    spawn(engine) {
        const spawnChoice = Math.random();
        const birdOrBenchChoice = Math.random();

        let entity;
        if (birdOrBenchChoice < 0.5) {
            entity = new Card(engine.currentScene, 1280 + 300, this.randomFloat(300, 585), this.health);
        } else {
            entity = new Sliding(engine.currentScene, 1280 + 300, 600, this.health);
        }

        const randomVelocityEntity = Math.random() * (-250 - -50) + -250;
        entity.vel = new ex.Vector(randomVelocityEntity, 0);
        engine.currentScene.add(entity);

        const level = this.savedData.getLevel() === 0 ? 1 : this.savedData.getLevel();
        const spawnBook = spawnChoice < 10;

        // Adjust spawning frequency based on level
        const baseSpawnFrequency = 0.33; // Base spawning frequency for Sliding and Card
        const birdSpawnChance = 0.5 + level * 0.5; // Decrease chance by 0.05 per level

        const bookSpawnFrequency = 0.1 + level * 0.1; // Decrease chance by 0.1 per level for Ball

        if (spawnBook || (spawnChoice >= baseSpawnFrequency && Math.random() < birdSpawnChance)) {
            if (spawnBook && Math.random() < bookSpawnFrequency) {
                const randomVelocityBook = Math.random() * (-200 - -20) + -200;
                const book = new Ball(engine.currentScene, 1280 + 350, this.randomFloat(300, 585), this.health, this.savedData, engine);

                // Increase book velocity based on level
                const velocityIncrease = level * 10; // Adjust the multiplier based on desired difficulty scaling
                const finalVelocityBook = randomVelocityBook - velocityIncrease;

                book.vel = new ex.Vector(finalVelocityBook, 0);
                engine.currentScene.add(book);
            } else {
                const birdPosX = 1280 + 300;
                const birdPosY = this.randomFloat(300, 585);
                const bird = new Card(engine.currentScene, birdPosX, birdPosY, this.health);
                const randomVelocityBird = Math.random() * (-250 - -50) + -250;
                bird.vel = new ex.Vector(randomVelocityBird, 0);
                engine.currentScene.add(bird);
            }
        }

        this.delay = this.random.integer(this.minDelay, this.maxDelay);
        this.timer.interval = this.delay;
    }
    spawn(engine) {
        const spawnChoice = Math.random();
        const birdOrBenchChoice = Math.random();

        let entity;
        if (birdOrBenchChoice < 0.5) {
            entity = new Card(engine.currentScene, 1280 + 300, this.randomFloat(300, 585), this.health);
        } else {
            entity = new Sliding(engine.currentScene, 1280 + 300, 600, this.health);
        }

        const randomVelocityEntity = Math.random() * (-250 - -50) + -250;
        entity.vel = new ex.Vector(randomVelocityEntity, 0);
        engine.currentScene.add(entity);

        const level = this.savedData.getLevel() === 0 ? 1 : this.savedData.getLevel();
        const spawnBook = spawnChoice < 10;

        // Adjust spawning frequency based on level
        const baseSpawnFrequency = 0.33; // Base spawning frequency for Sliding and Card
        const birdSpawnChance = 1 + level * 0.5; // Decrease chance by 0.05 per level

        const bookSpawnFrequency = 0.5; // Decrease chance by 0.1 per level for Ball

        if (spawnBook || (spawnChoice >= baseSpawnFrequency && Math.random() < birdSpawnChance)) {
            if (spawnBook && Math.random() < bookSpawnFrequency) {
                const randomVelocityBook = Math.random() * (-200 - -20) + -200;
                const book = new Ball(engine.currentScene, 1280 + 350, this.randomFloat(300, 585), this.health, this.savedData, engine);

                // Increase book velocity based on level
                const velocityIncrease = level * 10; // Adjust the multiplier based on desired difficulty scaling
                const finalVelocityBook = randomVelocityBook - velocityIncrease;

                book.vel = new ex.Vector(finalVelocityBook, 0);
                engine.currentScene.add(book);
            } else {
                const birdPosX = 1280 + 300;
                const birdPosY = this.randomFloat(300, 585);
                const bird = new Card(engine.currentScene, birdPosX, birdPosY, this.health);
                const randomVelocityBird = Math.random() * (-250 - -50) + -250;
                bird.vel = new ex.Vector(randomVelocityBird, 0);
                engine.currentScene.add(bird);
            }
        }

        this.delay = this.random.integer(this.minDelay, this.maxDelay);
        this.timer.interval = this.delay;
    }
}
