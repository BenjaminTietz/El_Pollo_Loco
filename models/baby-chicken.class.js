class BabyChicken extends MovableObject {
    width = 65;
    height = 65;
    y = 370;
    offset = {
        top: -20,
        bottom: -20,
        left: -20,
        right: -20,
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_DEAD); 
        this.x = 400 + Math.random() * 2000;  //200px Werten als linker max Wert mit (Math.random * 500px) addiert. Hier wird ein zufälligen Wert zwischen 0 & 1  generiert.
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    animate () {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.moveLeft();

        setInterval(() => {
            if(this.isDead()) {                                                         // Wenn die übergeordnete Funktion "isDead" = "true returned" DANN
                this.playAnimation(this.IMAGES_DEAD);  
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        },200);
    }



}