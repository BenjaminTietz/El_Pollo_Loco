class MovableObject extends DrawableObject {

    speed = 0.15;           // Variabel speed als Geschwindigkeit der zu bewegenden Objekte
    speedEndboss = 2;
    otherDirection = false; // Variabel otherDirection ist Standartmäßig = flase. Sobald Sie = true entspricht läuft unser Character in die andere Richtung.
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    ammountOfBottles = 0;
    coins = 0;
    collect_coin_sound = new Audio('audio/collect_coin.mp3');
    collect_bottle_sound = new Audio('audio/collect_bottle.mp3');

    applyGravity(){                                         // Die Funktion "applyGravity" prüft in einem definierten Intervall...
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){    //..ob sich unser Character gerade am Boden befindet ODER die vertikale Beschleunigung > 0 ist
                this.y -= this.speedY;                      // Der y-Koordinate wird der negative Wert von "speedY" zugewiesen da wir fallen und der 0 Punkt unseres Koordinatensystems oben links ist
                this.speedY -= this.acceleration;           // Von der Variable "speedY" wird der Wert von "acceleration" bagezogen um das Fallen zu beschleunigen
            }
        }, 1000 / 25);                                      // Der Intervall wird 40 mal pro Sekunde ausgeführt. (1000ms / 25)
    }

    isAboveGround(){                                    // Die Funktion "isAboveGround" prüft ob die aktuelle y-Koordinate < als 180 ist und gibt den Wert wieder.
        if (this instanceof ThrowableObject) {          // ThrowableObjects sollen immer fallen
            return true;
        } else {
        return this.y < 180;
        }
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
        if(this instanceof Endboss) {
            this.x += this.speedEndboss;  
        } else { 
            this.x += this.speed;                       // Auf die X Koordinate werden 10px addiert
        }
    }

    moveLeft() {
        if(this instanceof Endboss) {
            this.x -= this.speedEndboss;                       // Von der X Koordinate werden 10px subtrahiert
        } else {
            this.x -= this.speed;                       // Von der X Koordinate werden 10px subtrahiert
        }
    }

    jump() {                                        //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!
        this.speedY = 30;
    }

    hit() {                                             
        this.energy -= 5;                           // Bei der Funktion hit wird Energie abgezogen
        if (this.energy <= 0) {                     // mit der if Schleife stellen wir sicher, dass das Energielevel minimal 0 sein kann
            this.energy = 0;                        // hier wird this.energie gleich 0 gesetzt
        } else {
            this.lastHit = new Date().getTime();    // Wenn die Energie noch > 100 ist wird hier der letzte Zeitpunkt gespeichert andem wir vom Gegner getroffen wurden
        }
    }

    hitEndBoss() {                                             
        this.energy -= 50;                          // Bei der Funktion hit wird Energie abgezogen
        if (this.energy <= 0) {                     // mit der if Schleife stellen wir sicher, dass das Energielevel minimal 0 sein kann
            this.energy = 0;                        // hier wird this.energie gleich 0 gesetzt
        } else {
            this.lastHit = new Date().getTime();    // Wenn die Energie noch > 100 ist wird hier der letzte Zeitpunkt gespeichert andem wir vom Gegner getroffen wurden
        }
    }

    hitChicken() {                                             
        this.energy -= 100;                           // Bei der Funktion hit wird Energie abgezogen
        if (this.energy <= 0) {                     // mit der if Schleife stellen wir sicher, dass das Energielevel minimal 0 sein kann
            this.energy = 0;                        // hier wird this.energie gleich 0 gesetzt
        } 
    }


    isDead() {
        return this.energy == 0;                            // Die Funktion returned ="true" wenn die energy == 0 ist.
    }

    isCollectingCoins() {
        if (this.coins < 10 ) {
            this.coins +=  1;
            this.collect_coin_sound.play();
            //console.log('Character collects Coins',this.coins);
        }
    }

    isCollectingBottles() {
        if (this.ammountOfBottles < 5 ) {
            this.ammountOfBottles += 1;
            this.collect_bottle_sound.play();
            //console.log('Character collects:',this.ammountOfBottles);
        }
    } 

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;       // Differenz in ms  timePassed entspicht = aktuelle Zeit in ms seitdem 01.01.1970 - "lastHit" Zeit in ms wo wir zueltzt vom Gegner getroffen wurden
        timePassed = timePassed / 1000;                             // Differenz in s
        return timePassed < 5;                                      // Wenn wir in den letzten 1 Sekunde getroffen wurden returned die Funktion = true
    }

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
    }

    
        /* Funktioniert so NICHT
    isColliding (mo) {                                                          // Die Funktion "isColliding" prüft ob sich die Grenzrahm,en der Objekte berühren 
        return  (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
                (this.y + this.offsetY + this.height) >= mo.y &&
                (this.y + this.offsetY) <= (mo.y + mo.height) && 
                mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }
}*/



}
