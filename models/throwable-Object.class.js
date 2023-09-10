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
    soundPlayed = false;
    offset = {
        top: 10,
        bottom: 0,
        left: 10,
        right: 10,
    };
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

    /**
     * The function " animate()" calls the throw & animateBottles methode.
     */
    animate(){
        this.throw();
        this.animateBottles();
    }

    /**
     * The function "throw()" defines in which direction our bottle gets thrown with a defined X&Y Speed
     */
    throw() {
        this.speedY = 30;                                       // Geschwindigkeit der Wurfhöhe
        this.speedX = 20;                                       // Geschwindigkeit der Wurfweite
        this.applyGravity();                                    // Anwendung der Gravitation, damit das Objet wieder sinkt
        
        if(world.character.otherDirection == false) {
            this.x = world.character.x + 50;                    // Abstand zur Abwurfstelle
            setInterval(() => {
                this.x += 7;                                    //Wurfweite Vorwärts
            }, 20);
        } else {
            this.x = world.character.x - 30;                     // Abstand zur Abwurfstelle
            setInterval(() => {
              this.x -= 7;                                       //Wurfweite Rückwärts
            },  20);
        }
    }
    
/**
 * The function "animateBottles()" defines the animation of our thrown bottel depending on its state.
 */
    animateBottles() {
        setInterval(() => {
            if (this.y <= 360) {
                this.playAnimation(this.IMAGES_BottleRotation);
            } else if (world.level.endboss[0].isHurt && !this.soundPlayed) {
                this.playAnimation(this.IMAGES_BottleSplash);
                bottle_breaks_sound.play();
                this.soundPlayed = true; 
            }
        }, 25);
    }
}