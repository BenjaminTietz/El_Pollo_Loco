class BabayChicken extends MovableObject {
    width = 60;
    height = 40;
    y = 390;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING); 

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
            this.playAnimation(this.IMAGES_WALKING);
        },200);
    }

}