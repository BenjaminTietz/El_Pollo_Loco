class Character extends MovableObject {
    width = 200;
    height = 250;
    y = 180;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING);                       // Hier werden die übergeordnete Funktion loadImages aufgerufen. Dieser wird das Arrays "IMAGES_WALKING" übergeben woraus die Bilder unseres Characters geladen werden.

        this.animate();                                             // Hier wird die Funktion "animate" aufgerufen.
    }

    animate () {

        setInterval(() =>{                                  // Diese "setInterval" Funktion beinhaltet 2 if Schleifen welche erfassen ob wir die linke oder rechte Pfeiltaste gedrückt haben.
            if (this.world.keyboard.right) {                // WENN unsere rechte Pfeiltaste den Wert den Wert true hat
                this.x += this.speed;                       // Auf die X Koordinate werden 10px addiert
                this.otherDirection = false;                // Variabel "otherDirection" bekommt den Wert = "false"
            }
            if (this.world.keyboard.left) {                 // WENN unsere linke Pfeiltaste den Wert den Wert true hat
                this.x -= this.speed;                       // Von der X Koordinate werden 10px subtrahiert
                this.otherDirection = true;                 // Variabel "otherDirection" bekommt den Wert = "true". Wenn der Wert = "true" ist soll das Bild unseres Characters gespiegelt werden.
                }
        }, 1000 / 60);                                      // Hier wird die Intervallgeschwindigkeit, in welcher unsere Funktion ausgeführt hat, definiert. 1000ms / 60 = 60FPS

        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length;             // % = Modulo  let i = 0 % 6; ist in Ganzzahlen 0, Rest 0, Null geteilt durch Sechs => Modulo ist der mathematische Rest  // let i = 5 % 6; ist in Ganzzahlen 0, Rest 5 // let i = 6 % 6; ist in Ganzzahlen 1, Rest 0 // let i = 7 % 6; ist in Ganzzahlen 1, Rest 1
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 .....
                let path = this.IMAGES_WALKING[i];                                  //currentImage ist beim ersten Durchlauf = 0, demnach laden wir das 0. Bild
                this.img = this.imageCache[path];                                   // [path] greift auf einen Eintrag useres Array zu und wird der globalen Variable img zugewiesen
                this.currentImage++;                                                //currentImage wird um 1 erhöht
            }
        },50);
    }

    jump() {             //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!

    }
}