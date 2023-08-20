class ThrowableObject extends MovableObject{

    IMAGES_BottleRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BottleSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    world;
    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BottleRotation); 
        this.loadImages(this.IMAGES_BottleSplash); 
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
    }

    animate(){
        this.throw();
        this.rotateBottles();
        //this.splashBottles();
    }

    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(() => {
        if(world.character.otherDirection == false) {
            this.x += 10;
        } else {
            this.x -= 10;
        }
        }, 25);
    }

    rotateBottles() {
        setInterval(() =>{
            if (this.y <= 360) {
                this.playAnimation(this.IMAGES_BottleRotation);
            }
        },25);
    }
    
    splashBottles() {
        setInterval(() =>{
            if (this.world.endBoss.isHurt()) {
                this.playAnimation(this.IMAGES_BottleSplash);
            }
        },1000 / 50);
    }

}