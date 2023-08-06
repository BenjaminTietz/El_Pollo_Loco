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
    energy = 100;
    lastHit = 0;

    applyGravity(){                                         // Die Funktion "applyGravity" prüft in einem definierten Intervall...
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){    //..ob sich unser Character gerade am Boden befindet ODER die vertikale Beschleunigung > 0 ist
                this.y -= this.speedY;                      // Der y-Koordinate wird der negative Wert von "speedY" zugewiesen da wir fallen und der 0 Punkt unseres Koordinatensystems oben links ist
                this.speedY -= this.acceleration;           // Von der Variable "speedY" wird der Wert von "acceleration" bagezogen um das Fallen zu beschleunigen
            }
        }, 1000 / 25);                                      // Der Intervall wird 40 mal pro Sekunde ausgeführt. (1000ms / 25)
    }

    isAboveGround(){                // Die Funktion "isAboveGround" prüft ob die aktuelle y-Koordinate < als 180 ist und gibt den Wert wieder.
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
    drawFrame(ctx){                                                                             // Die Funktion  drawFrame zeichnet rechteckige Rahmen um unsere bewegende Objekte       
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){    // Durch "this instanceof" als Bedingung unserer if Schleife werden die Rahme nur um die benannten Objekte gezeichnet und nicht um alle(hintergrund / Wolken)
            ctx.beginPath();            
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
        let i = this.currentImage % images.length;             // % = Modulo  let i = 0 % 6; ist in Ganzzahlen 0, Rest 0, Null geteilt durch Sechs => Modulo ist der mathematische Rest  // let i = 5 % 6; ist in Ganzzahlen 0, Rest 5 // let i = 6 % 6; ist in Ganzzahlen 1, Rest 0 // let i = 7 % 6; ist in Ganzzahlen 1, Rest 1
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

    jump() {                                        //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!
        this.speedY = 30;
    }

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;       // Differenz in ms
        timePassed = timePassed / 1000;                             // Differenz in s
        return timePassed < 1;                                      // Wenn wir in den letzten 1 Sekunde getroffen wurden returned die Funktion = true
    }

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
    }
        /* Funktioniert so NICHT
    isColliding (mo) {                                                          // Die Funktion "isColliding" prüft ob sich die Grenzrahm,en der Objekte berühren 
        return  (this.X + this.width) >= mo.X && this.X <= (mo.X + mo.width) && 
                (this.Y + this.offsetY + this.height) >= mo.Y &&
                (this.Y + this.offsetY) <= (mo.Y + mo.height) && 
                mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }
}*/
}
