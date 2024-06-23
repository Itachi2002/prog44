import * as ex from 'excalibur';
import {Resources} from "./resources.js";

export class Points extends ex.Actor
{
    constructor() {
        super({
            width: Resources.book.width,
            height: Resources.book.height,
            collisionType: ex.CollisionType.Passive
        });
        this.graphics.use(Resources.book.toSprite());

        this.pos = ex.vec(1250, 65)
        this.scale = new ex.vec(0.1, 0.1)
    }
}
