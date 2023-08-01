class Chicken extends MovableObject {
    width = 100;
    height = 60;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING); 
        this.x = 200 + Math.random() * 500;  //200px Werten als linker max Wert mit (Math.random * 500px) addiert. Hier wird ein zufälligen Wert zwischen 0 & 1  generiert.
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate () {
        this.moveLeft();
        setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;             // % = Modulo  let i = 0 % 6; ist in Ganzzahlen 0, Rest 0, Null geteilt durch Sechs => Modulo ist der mathematische Rest  // let i = 5 % 6; ist in Ganzzahlen 0, Rest 5 // let i = 6 % 6; ist in Ganzzahlen 1, Rest 0 // let i = 7 % 6; ist in Ganzzahlen 1, Rest 1
        // i = 0, 1, 2, 0, 1, 2, 0, 1, 2,.....
        let path = this.IMAGES_WALKING[i];                                  //currentImage ist beim ersten Durchlauf = 0, demnach laden wir das 0. Bild
        this.img = this.imageCache[path];                                   // [path] greift auf einen Eintrag useres Array zu und wird der globalen Variable img zugewiesen
        this.currentImage++;                                                //currentImage wird um 1 erhöht
        },200);
    }

}