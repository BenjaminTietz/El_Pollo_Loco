class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 45;
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
    constructor () {                                            // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage(this.IMAGES_ALERT[0]);              // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_ALERT);                   // Hier werden die Bilder des Arrays "images_alert" geladen
        this.loadImages(this.IMAGES_WALK);                   // Hier werden die Bilder des Arrays "images_walk" geladen
        this.loadImages(this.IMAGES_ATTACK);                   // Hier werden die Bilder des Arrays "images_attack" geladen
        this.loadImages(this.IMAGES_HURT);                   // Hier werden die Bilder des Arrays "images_hurt" geladen
        this.loadImages(this.IMAGES_DEAD);                   // Hier werden die Bilder des Arrays "images_dead" geladen
        this.x = 2400;                                           // this.x defineirt den Punkt auf der X-Ache wo unser Endboss eingefügt wird
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();                                         // Hier wird die Funktion "animate" aufgerufen
    }

    animate () {
        setInterval(() => {

                this.moveLeft();
        }, 100 / 60);
        this.moveLeft();

        setInterval(() => {
            if(this.isDeadEndboss()) {                              // Wenn die übergeordnete Funktion "isDeadEndboss" = "true returned" DANN
                this.playAnimation(this.IMAGES_DEAD);               // ... wird die Animation mit den Bildern Images_Dead abgespielt
                //this.dead_sound.play(); 
            } else if (this.energyEndboss > 0){
                this.playAnimation(this.IMAGES_WALK);
            }
            
        },200);
    }

}
