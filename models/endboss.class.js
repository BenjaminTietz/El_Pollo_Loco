class Endboss extends MovableObject {

    width = 250;
    height = 400;
    y = 45;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    constructor () {                                            // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage(this.IMAGES_WALKING[0]);              // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING);                   // Hier werden die Bilder des Arrays "images_walking" geladen
        this.x = 700;                                           // this.x defineirt den Punkt auf der X-Ache wo unser Endboss eingefügt wird
        this.animate();                                         // Hier wird die Funktion "animate" aufgerufen
    }

    animate () {        
        setInterval(() => {                                     // Die Funktion animate ruft in einem bestimmten Intervall die übergeordnete Funktion "playAnimation" auf
            this.playAnimation(this.IMAGES_WALKING);            //...dieser wirde als Parameter unser Array "images_walking" mitgegeben
        },200);
    }

}
