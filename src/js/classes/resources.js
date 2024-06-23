import {ImageSource, Sound, Resource, Loader} from 'excalibur'
import Walk from '../../images/walk_new.png';
import Die from "../../images/death_new.png";
import Death from "../../images/death_particles_new.png";
import Jump from "../../images/jump_new.png";
import Hurt from "../../images/walk_hurt_new.png";
import BackgroundSky from '../../images/sky.png';
import BackgroundGround from '../../images/ground.png';
import StartButton from '../../images/startbutton.gif';
import Ball from '../../images/ball.png';
import Ballpoint from '../../images/ballpoint.png';
import Card from '../../images/redyellowcard.png';
import Ballpoints from '../../images/ball_point.png';
import Slide from '../../images/slide.png';
import gameLogo from '../../images/cr7.png';
import Item1 from '../../images/level1.png';
import Item2 from '../../images/level2.png';
import Item3 from '../../images/level3.png';
import Item4 from '../../images/level4.png';

const Resources = {
    background: [
        new ImageSource(Item1), new ImageSource(Item2), new ImageSource(Item3), new ImageSource(Item4)
    ],
    character: [
        new ImageSource(Walk), new ImageSource(Die), new ImageSource(Death), new ImageSource(Jump), new ImageSource(Hurt)
    ],
    startButton: new ImageSource(StartButton),
    book: new ImageSource(Ball),
    bookParticle: new ImageSource(Ballpoint),
    bookParticles: new ImageSource(Ballpoints),
    bird: new ImageSource(Card),
    bench: new ImageSource(Slide),
    backgroundSky: new ImageSource(BackgroundSky),
    backgroundGround: new ImageSource(BackgroundGround)
}
const ResourceLoader = new Loader([Resources.character[0], Resources.character[1], Resources.character[2], Resources.character[3], Resources.character[4], Resources.background[0], Resources.background[1], Resources.background[2], Resources.background[3], Resources.startButton, Resources.book, Resources.bookParticle, Resources.bookParticles, Resources.bird, Resources.bench, Resources.backgroundSky, Resources.backgroundGround])
ResourceLoader.logo = gameLogo;
ResourceLoader.logoWidth = 500
ResourceLoader.logoHeight = 500


export {Resources, ResourceLoader}