class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 45;
    world;
    firstContact = false;
    animationDuration = 2000; // 2 Sekunden
    gameOverSoundPlayed = false;
    world;
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
    
/**
 * The function "distanceToEndboss(distance)" checks if defined distances between character & endboss are given-
 * @param {Number} distance 
 * @returns a boolean value if statement is true ore false.
 */
    distanceToEndboss(distance) {
        return this.x - this.world.character.x < distance;
        
    }

/**
* The function "firstContactToEndboss()" sets a definied distance between character & endboss to have a first contact with eachother.
*/
    firstContactToEndboss() {
        if (this.x - this.world.character.x < 400) {
            this.firstContact = true;
        }
    }

/**
* The function "startAnimateInterval()" animates our character by playing different animations based on its state.
*/
    startAnimateInterval() {
        return setInterval(() => {
            if (this.isDead()) {                       // Wenn der Endboss tot ist und die Animation nicht gestartet wurde
                this.endBossIsDead();
            } else if (!this.isDead() && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.isDead() && !this.isHurt() && this.firstContact == true) {
                this.playAnimation(this.IMAGES_WALK);
            } else if (!this.isDead() && !this.isHurt() && this.firstContact == false) {
                this.playAnimation(this.IMAGES_ALERT);
                this.firstContactToEndboss();
            }
        }, 250);
    }

/**
* The function "startAnimationDecisionInterval()" animates our endboss by playing different animations based on its state.
*/
    startAnimationDecisionInterval() {
        return setInterval(() => {  
            if (this.distanceToEndboss(0) && !this.isDead()) {
                if (!soundSettingsActive){
                    this.moveRight();
                    }
                this.otherDirection = true; 
            } else if(this.distanceToEndboss(400) || this.firstContact == true && !this.isDead()){ 
                if (!soundSettingsActive){
                    this.moveLeft();
                    }
                this.otherDirection = false;
            } 
        }, 1000 / 60);
    }

/**
* The function "endBossIsDead()" animates our endboss by playing different animations based on its state, stopps certain intervall functions and shows the game over
*/
    endBossIsDead() {
        this.playAnimation(this.IMAGES_DEAD);                               // Starten  der Todesanimation
                setTimeout(() => {
                    this.clearAllIntervals();
                    this.world.character.clearAllIntervals();
                }, this.animationDuration);
                setTimeout(() =>{
                    showEndScreenWon();                                     // Nach 2 Sekundenwird der Game Over Screen-Funktion aufrufen
                    if (!this.gameOverSoundPlayed) {
                        this.gameOverSoundPlayed = true;
                        you_won_sound.play(); 
                    }
                }, this.animationDuration);
    }
/**
* The function "clearAllIntervals()" stops the desired interval functions.
*/
    clearAllIntervals() {
        clearInterval(this.animateInterval);
        clearInterval(this.animationDecisionInterval);
    }
}

