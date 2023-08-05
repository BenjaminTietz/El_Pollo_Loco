class MovableObject {
    x = 120;                // Variabel X als X Koordinate
    y = 280;                // Variabel Y als Y Koordinate
    img;                    // Variabel img für Bilder
    height = 150;           // Variabel height als Höhe des zu bewegenden Objektes
    width = 100;            // Variabel width als Breite des zu bewegenden Objektes
    imageCache = {};        // JSON 
    currentImage = 0;       // Variabel currentImage als Index der Bilder
    speed = 0.15;           // Variabel speed als Geschwindigkeit der zu bewegenden Objekte
    otherDirection = false; // Variabel otherDirection ist Standartmäßig = flase. Sobald Sie = true entspricht läuft unser Character in die andere Richtung.
    speedY = 0;
    acceleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 180;
    }
    // loadImage ('img/test.png')
    loadImage(path) {               // Funktion "loadImage" lädt Bilder, Dieser wird der Wert "path" übergeben.
        this.img = new Image();     // Der Globalen Variabel "this.img" = wird in Form fon document.getElementById('image') <id="image" src> zugewiesen.
        this.img.src = path;        // Der Globalen Variabel "this.img" wird als zu ladener Quelle = "path" zugewiesen
    }

    draw (ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // Hier wird das Bild eingefügt.
    }
    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
/**
 * 
 * @param {Array} arr - ['img/image1.png','img/image2.png','img/image3.png',...]
 */
    loadImages(arr){
        arr.forEach((path) =>{              // Für jedes Element des Arrays "arr" wird diese Schleiße mit eingegliederter Funktion aufgerufen. Der Funktion wird der Wert "path" übergeben. Dieser beinhaltet die Pfade der anzuzeigenden Bilder.
            let img = new Image();          // let img = document.getElementById('image') <id="image" src>
            img.src = path;                 // Der Globalen Variabel "this.img" wird als zu ladener Quelle = "path" zugewiesen
            this.imageCache[path] = img;    //durch das this.Variable greifen wir auf die Variable innerhalb des Objektes zu nicht auf die innerhalb der Funktion
        });
    }

    playAnimation(images) {
        // Walk animation
        let i = this.currentImage % this.IMAGES_WALKING.length;             // % = Modulo  let i = 0 % 6; ist in Ganzzahlen 0, Rest 0, Null geteilt durch Sechs => Modulo ist der mathematische Rest  // let i = 5 % 6; ist in Ganzzahlen 0, Rest 5 // let i = 6 % 6; ist in Ganzzahlen 1, Rest 0 // let i = 7 % 6; ist in Ganzzahlen 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 .....
        let path = images[i];                                               //currentImage ist beim ersten Durchlauf = 0, demnach laden wir das 0. Bild
        this.img = this.imageCache[path];                                   // [path] greift auf einen Eintrag useres Array zu und wird der globalen Variable img zugewiesen
        this.currentImage++;                                                //currentImage wird um 1 erhöht
    }

    moveRight() {
        this.x += this.speed;                       // Auf die X Koordinate werden 10px addiert
    }

    moveLeft() {
        this.x -= this.speed;                       // Von der X Koordinate werden 10px subtrahiert
    }

    jump() {             //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!
        this.speedY = 30;
    }
}