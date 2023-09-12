class MovableObject extends DrawableObject {

    speed = 0.15;           // Variabel speed als Geschwindigkeit der zu bewegenden Objekte
    speedEndboss = 4;
    otherDirection = false; // Variabel otherDirection ist Standartmäßig = flase. Sobald Sie = true entspricht läuft unser Character in die andere Richtung.
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    ammountOfBottles = 0;
    coins = 0;
    world;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * The function "applyGravity()" checks in a defined interval whether our character is on the ground or whether the vertical acceleration is greater than 0 and simulates gravity.
     */
    applyGravity(){                                         // Die Funktion "applyGravity" prüft in einem definierten Intervall...
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){    //..ob sich unser Character gerade am Boden befindet ODER die vertikale Beschleunigung > 0 ist
                this.y -= this.speedY;                      // Der y-Koordinate wird der negative Wert von "speedY" zugewiesen da wir fallen und der 0 Punkt unseres Koordinatensystems oben links ist
                this.speedY -= this.acceleration;           // Von der Variable "speedY" wird der Wert von "acceleration" bagezogen um das Fallen zu beschleunigen
            }
        }, 1000 / 25);                                      // Der Intervall wird 40 mal pro Sekunde ausgeführt. (1000ms / 25)
    }

    /**
     * The function "isAboveGround()" checks if our charater is in the air and returns this as a boolean value. Throwable objects always get the value "true"
     */
    isAboveGround(){                                    // Die Funktion "isAboveGround" prüft ob die aktuelle y-Koordinate < als 180 ist und gibt den Wert wieder.
        if (this instanceof ThrowableObject) {          // ThrowableObjects sollen immer fallen
            return true;
        } else {
        return this.y < 180;
        }
    }

    /**
     * The function "playAnimation(images) "uses the modulo operator to iterate over the image arrays of our animations. The images parameter corresponds to our storage location.
     * @param {*} images 
     */
    playAnimation(images) {
        // Walk animation
        let i = this.currentImage % images.length;             // % = Modulo  let i = 0 % 6; ist in Ganzzahlen 0, Rest 0, Null geteilt durch Sechs => Modulo ist der mathematische Rest  // let i = 5 % 6; ist in Ganzzahlen 0, Rest 5 // let i = 6 % 6; ist in Ganzzahlen 1, Rest 0 // let i = 7 % 6; ist in Ganzzahlen 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5 .....
        let path = images[i];                                               //currentImage ist beim ersten Durchlauf = 0, demnach laden wir das 0. Bild
        this.img = this.imageCache[path];                                   // [path] greift auf einen Eintrag useres Array zu und wird der globalen Variable img zugewiesen
        this.currentImage++;                                                //currentImage wird um 1 erhöht
    }

    /**
     * The function "moveRight()" lets our character & endboss move to the right in a defined speed
     */
    moveRight() {
        if(this instanceof Endboss) {
            this.x += this.speedEndboss;  
        } else { 
            this.x += this.speed;                       // Auf die X Koordinate werden 10px addiert
        }
    }

    /**
     * The function "moveRight()" lets our character & endboss move to the left in a defined speed.
     */
    moveLeft() {
        if(this instanceof Endboss) {
            this.x -= this.speedEndboss;                       // Von der X Koordinate werden 10px subtrahiert
        } else {
            this.x -= this.speed;                       // Von der X Koordinate werden 10px subtrahiert
        }
    }

    /**
     * The function "jump()" defines the vertical speed to make our character jump.
     */
    jump() {                                        //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!
        this.speedY = 40;
    }

    /**
     * The function "jumpAfterKill()" defines the vertical speed to make our character jump after he killed a chicken from the top.
     */
    jumpAfterKill() {
        this.speedY = 25;
    }

    /**
     * The function "hit()" drains energy from our character after a collision, making sure the energy can be at least 0 and sets a timestamp when the last collision was.
     */
    hit() {                                           
            this.energy -= 0;                          // Bei der Funktion hit wird Energie abgezogen
         if (this.energy <= 0) {                       // mit der if Schleife stellen wir sicher, dass das Energielevel minimal 0 sein kann
            this.energy = 0;                            // hier wird this.energie gleich 0 gesetzt
        } else {
            this.lastHit = new Date().getTime();    // Wenn die Energie noch > 100 ist wird hier der letzte Zeitpunkt gespeichert andem wir vom Gegner getroffen wurden
        }
    }

    /**
     * The function "hitEndBoss()" drains energy from the endboss after a collision, making sure the energy can be at least 0 and sets a timestamp when the last collision was.
     */
    hitEndBoss() {   
        if (this.isHurt()) {                                         
            this.energy -= 20;                          // Bei der Funktion hit wird Energie abgezogen
        } if (this.energy <= 0) {                       // mit der if Schleife stellen wir sicher, dass das Energielevel minimal 0 sein kann
            this.energy = 0;                            // hier wird this.energie gleich 0 gesetzt
        } else {
            this.lastHit = new Date().getTime();    // Wenn die Energie noch > 100 ist wird hier der letzte Zeitpunkt gespeichert andem wir vom Gegner getroffen wurden
        }
    }

    /**
     * The function "hitChicken()" drains energy from the chickens after a collision, making sure the energy can be at least 0 and sets a timestamp when the last collision was.
     */
    hitChicken() {                                             
        this.energy -= 100;                          // Bei der Funktion hit wird Energie abgezogen
        if (this.energy <= 0) {                     // mit der if Schleife stellen wir sicher, dass das Energielevel minimal 0 sein kann
            this.energy = 0;                        // hier wird this.energie gleich 0 gesetzt
        } 
    }

    /**
     * The function "isDead()" returns a boolean value as soon as the energy level equals 0.
     */
    isDead() {
        return this.energy == 0;                            // Die Funktion returned ="true" wenn die energy == 0 ist.
    }

    /**
     * The function "isCollectingCoins()" checks how many coins we have collected and adds coins if the condition is not met and plays a sound.
     */
    isCollectingCoins() {
        if (this.coins < 10 ) {
            this.coins +=  1;
            collect_coin_sound.play();
        }
    }

    /**
     * The function "isCollectingBottles()" checks how many bottles we have collected and adds bottles if the condition is not met and plays a sound.
     */
    isCollectingBottles() {
        if (this.ammountOfBottles < 10 ) {
            this.ammountOfBottles += 1;
            collect_bottle_sound.play();
        }
    } 

    /**
     * The function "isHurt()" returns a boolean value if we haven't collided with the enemy in the last 1 second
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;       // Differenz in ms  timePassed entspicht = aktuelle Zeit in ms seitdem 01.01.1970 - "lastHit" Zeit in ms wo wir zueltzt vom Gegner getroffen wurden
        timePassed = timePassed / 1000;                             // Differenz in s
        return timePassed < 1;                                      // Wenn wir in den letzten 1 Sekunde getroffen wurden returned die Funktion = true
    }
    
/**
 * The function "isColliding(mo)" checks whether the objects to be moved in our game collide with each other. The objects have an X & Y coordinate and defined heights & widths as well as offset factors.
 * @param {*} mo is a moving object of our game . The objects have an X & Y coordinate and defined heights & widths as well as correction factors. The method isColliding checks if 2 objects colliding into each other.
 * @returns returns a boolean value when 2 objects collide
 */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }
}
