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

    // loadImage ('img/test.png')
    loadImage(path) {               // Funktion "loadImage" lädt Bilder, Dieser wird der Wert "path" übergeben.
        this.img = new Image();     // Der Globalen Variabel "this.img" = wird in Form fon document.getElementById('image') <id="image" src> zugewiesen.
        this.img.src = path;        // Der Globalen Variabel "this.img" wird als zu ladener Quelle = "path" zugewiesen
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

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;           
            },1000 / 60);                   // 60FPS verändert sich die x Koordinate um -0,2
    }
}