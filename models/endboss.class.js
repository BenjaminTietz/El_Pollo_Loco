class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 45;
    world;
    firstContact = false;
    animationDuration = 5000; // 2 Sekunden
    animationStarted = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 20,
        right: 0,
    };
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'      
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    world;

    constructor () {                                                                // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');               // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_ALERT);                                         // Hier werden die Bilder des Arrays "images_alert" geladen
        this.loadImages(this.IMAGES_WALK);                                          // Hier werden die Bilder des Arrays "images_walk" geladen
        this.loadImages(this.IMAGES_ATTACK);                                        // Hier werden die Bilder des Arrays "images_attack" geladen
        this.loadImages(this.IMAGES_HURT);                                          // Hier werden die Bilder des Arrays "images_hurt" geladen
        this.loadImages(this.IMAGES_DEAD);                                          // Hier werden die Bilder des Arrays "images_dead" geladen
        this.x = 2400;                                                              // this.x definiert den Punkt auf der X-Ache wo unser Endboss eingefügt wird
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateInterval = this.startAnimateInterval();
        this.animationDecisionInterval = this.startAnimationDecisionInterval();                                                           // Hier wird die Funktion "animate" aufgerufen
    }

    distanceToEndboss(distance) {
        return this.x - this.world.character.x < distance;
        
    }

    firstContactToEndboss() {
        if (this.x - this.world.character.x < 400) {
            this.firstContact = true;
        }
    }

    startAnimateInterval() {
        return setInterval(() => {
            if (this.isDead() && !this.animationStarted) {                       // Wenn der Endboss tot ist und die Animation nicht gestartet wurde
                this.animationStarted = true;                                    // Setzen Sie die Flagge, um die Animation zu starten
                this.playAnimation(this.IMAGES_DEAD);                       // Starten Sie die Todesanimation
                setTimeout(() => {
                    this.clearAllIntervals();
                    this.world.character.clearAllIntervals();
                    //world.chicken.clearAllIntervals();
                }, this.animationDuration);
                setTimeout(() =>{
                    showEndScreenWon();                                     // Nach 2 Sekunden den Game Over Screen aufrufen
                }, this.animationDuration);
            } else if (!this.isDead() && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.isDead() && !this.isHurt() && this.firstContact == true) {
                this.playAnimation(this.IMAGES_WALK);
            } else if (!this.isDead() && !this.isHurt() && this.firstContact == false) {
                this.playAnimation(this.IMAGES_ALERT);
                this.firstContactToEndboss();
            }
        }, 150);
    }
    startAnimationDecisionInterval() {
        return setInterval(() => {  
            if (this.distanceToEndboss(0) && !this.isDead()) {
                this.moveRight();
                this.otherDirection = true; 
            } else if(this.distanceToEndboss(400) || this.firstContact == true && !this.isDead()){ 
                //console.log('Position of Endboss is:',this.x);
                //console.log('Position of Character is:',this.world.character.x);
                this.moveLeft();
                this.otherDirection = false;
            } 
        }, 1000 / 60);
    }
    clearAllIntervals() {
        clearInterval(this.animateInterval);
        clearInterval(this.animationDecisionInterval);
    }
}

