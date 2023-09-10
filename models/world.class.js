class World {
    character = new Character();            // Variablen definiert man innerhalb von Klassen OHNE let / var
    level = level1;
    endboss = this.level.endboss[0];
    canvas;
    ctx;                                    // Variable Context wird definiert
    keyboard;
    camera_x = 0;                           // Variable "camera_x" definiert wie weit wir unseren KOntext aka Welt sobald unser Character läuft verschieben.
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottle = [];
    bottleOnGround = new Bottles();
    coinInAir = new Coins();

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;               // Mit this.canvas greifen wir auf das oben definierte Variable Canvas zu und geben Ihm den Wert des "canvas" welches der Funktion als parameter übergeben wird.
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

/**
* The function "setWorld()" defines our world with given global variables.
*/
    setWorld() {
        this.character.world = this;
        this.endboss.world  = this;
    }

/**
* The function "run()" executes functions at a defined interval, which are used to check for collisions, for example.
*/
    run() {                                             // Die Funktion "run" prüft in einem definierten Intervall ob bewegende Objekte miteinander kollidieren. 
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionEndboss();
            this.checkThrowObjects();
            this.checkCollectionCoins();
            this.checkCollectionBottle();
            this.checkBottleHitsEndBoss();
            this.checkcoinIsCollected();
            this.checkBottleHitsChicken();
            this.checkCollisionPosition();
        }, 50);
    }

/**
* The function "checkThrowObjects()" checks whether throwable objects are available and lets us insert them into the game by pressing the D key and then deletes them from the "throwableObjects" array and plays a sound.
*/
    checkThrowObjects(){                                                                            // checkThrowobjects prüft ob die Taste d gedrückt wird und die Anzahl der Flaschen größer 0 ist
        if(this.keyboard.d) {
            if (this.character.ammountOfBottles > 0){
                this.character.lastMove = new Date().getTime();
                let bottle = new ThrowableObject (this.character.x + 100, this.character.y + 100);  // der Funktionsvariabel "bottle" wird ein neues zu werfendes Objekt zugewiesen, dieses wird an definierten Koordinaten eingefügt
                this.character.ammountOfBottles--;                                                  // hier wird die Anzahl der verfügbaren Flaschen reduziert            
                this.statusBarBottle.setBottles(this.character.ammountOfBottles);                   // hier wird die Statusbar der Flaschen geupdated
                this.throwableObjects = this.throwableObjects.splice(0, 1);                         // hier wird aus dem Array "throwableObjects" ein Objekt entfernt
                this.throwableObjects.push(bottle);                                                 // hier wird dem Array "throwableObjects" ein Objekt hinzugefügt
                this.collectedBottle.splice(0, 1);                                                  // hier wird aus dem Array "collectedBottle" ein Objekt entfernt   
                throw_bottle_sound.play();
            }
        }
    }

/**
* The function "checkCollisions()" checks if objects from our enemies array collide with our character under certain conditions.
*/
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {                 // Mit "this.level.enenies" bekommen wir all unsere Gegener durch "forEach" prüfen wir ob jeder der Gegner mit unserem Character kollidiert.
            if(this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()){
                    this.checkKillChickenFromTop();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
* The function "checkCollisionEndboss()" checks if our character is colliding with the endboss.
*/
    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {                 // Mit "this.level.enenies" bekommen wir all unsere Gegener durch "forEach" prüfen wir ob jeder der Gegner mit unserem Character kollidiert.
            if(this.character.isColliding(endboss) ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

/**
* The function "checkCollectionCoins()" checks if our character is colliding with our collectable coins and calls another function wich adds the coins to our ammount of collected coins.
*/
    checkCollectionCoins() {
        this.level.coins.forEach((coins) => {                 // Mit "this.level.coins" bekommen wir all unsere Coins die wir einsammeln können durch "forEach" prüfen wir ob jeder der Gegenstände mit unserem Character kollidiert.
            if(this.character.isColliding(coins) ) {
                this.character.isCollectingCoins(); 
                this.statusBarCoins.setCoins(this.character.coins);
            }
        });
    }

/**
* The function "checkcoinIsCollected()" iterates through our coin array and deletes the coins from the array that have already been collected.
*/
    checkcoinIsCollected() {
            for (let i = 0; i < this.level.coins.length; i++) {
            const coins = this.level.coins[i];
            if (this.character.isColliding(coins)) {
                this.level.coins.splice(i, 1);
            }
        }
    }

/**
* The function "checkCollectionBottle()" checks if our character is colliding with our collectable bottles and calls another function wich adds the bottles to our ammount of collected bottles.
*/
    checkCollectionBottle() {
        this.level.bottles.forEach((bottles) => {                 // Mit "this.level.bottles" bekommen wir all unsere Gegenstände die wir einsammeln können durch "forEach" prüfen wir ob jeder der Gegenstand mit unserem Character kollidiert.
            if(this.character.isColliding(bottles) ) {
                this.bottleIsCollected();
                this.character.isCollectingBottles(); 
                this.collectedBottle = this.collectedBottle.splice(0, 4);
                this.collectedBottle.push(bottles);
                this.statusBarBottle.setBottles(this.character.ammountOfBottles);
            }
        });
    }

/**
* The function "bottleIsCollected()" iterates through our collectedBottle array and deletes them from the array if they have already been collected.
*/
    bottleIsCollected() {
        if (this.collectedBottle.length < 10) {
            for (let i = 0; i < this.level.bottles.length; i++) {
                const bottles = this.level.bottles[i];
                if (this.character.isColliding(bottles)) {
                    this.level.bottles.splice(i, 1);
                }
            }
        }
    }

/**
* The function "checkBottleHitsEndBoss()" iterates through throwableObjects array and checks if the throwableObjects are colliding with our endboss. If so it calls a function "hitEndBoss" to decrease the enrgy of the endboss and refresh the statusbar.
*/
    checkBottleHitsEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    endboss.hitEndBoss();
                    this.statusBarEndboss.setEndBoss(endboss.energy);
                    setTimeout(() =>{
                        this.deleteThrownBottle(bottle);
                        },100);
                }
            });
        });
    }

/**
* The function "checkBottleHitsChicken()" iterates through throwableObjects array and checks if the throwableObjects are colliding with our enemies. If so it calls a function "hitChicken" to decrease the enrgy of the enemy.
*/
    checkBottleHitsChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemies) => {
                if (bottle.isColliding(enemies)) {
                    enemies.hitChicken();
                    setTimeout(() =>{
                    this.deleteEnemy(enemies);
                    },500);
                }
            });
        });
    }

/**
* The function "checkKillChickenFromTop()" iterates through enemies array and checks if our character is colliding under certain circumstances with our enemies. If so it calls a function "hitChicken" to decrease the enrgy of the enemy. 
* The function "jumpAfterKill() is also called, which makes our character jump after hitting a chicken from above. After that, the chicken will be deleted from the enemies array.
*/
    checkKillChickenFromTop() {
        this.level.enemies.forEach((enemies) => {
            if (this.character.isColliding(enemies) && this.character.isAboveGround() && !this.character.isHurt()) {
                if (enemies.energy == 100) {
                enemies.hitChicken();
                chicken_kill_sound.play();
                this.character.jumpAfterKill();
                setTimeout(() => {
                    this.deleteEnemy(enemies);
                }, 500);
            }
            }
        });
    }

/**
* The function "checkCollisionPosition()" checks if our character is in the air. If so, the checkKillChickenFromTop() function is called, otherwise the checkCollisions() function is executed.
*/
    checkCollisionPosition() {
        if (this.character.isAboveGround()) {
            this.checkKillChickenFromTop();
        } else {
            this.checkCollisions();
        }
    }

/**
* The function "deleteEnemy(enemies)" assigns an index to the opponent within the array. And then delete it at the appropriate position.
* @param {Array} enemies - The "enemies" array contains all of our chicken enemies.
*/
    deleteEnemy(enemies) {
        let i = this.level.enemies.indexOf(enemies);
        this.level.enemies.splice(i, 1);
    }

/**
 * 
 * @param {Array} throwableObjects - The "throwableObjects" array
 */
    deleteThrownBottle(bottle) {
        let i = this.throwableObjects.indexOf(bottle);
        this.throwableObjects.splice(i,1);
    }

/**
* The function "draw()" inserts graphics into our canvas.
*/
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);                   // Durch ctx.tanslate verschiebt sich unsere gesamter Kontext auf der X-Achse um den Wert der Variabel "camera_x" der Wert für die Verschiebung der Y- Achse muss mitangegebn werden. Dieser beträgt 0.
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addMovableObjectsToMap();
        this.ctx.translate(-this.camera_x, 0); 
        //------------------------------------------------- //Hier können fixierte Objekte eingebunden werden.
        this.addStatusbarsToMap();
        this.ctx.translate(this.camera_x, 0);  
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);                  //Hier drehen wir die Funktion welche unseren Kontext verschieb wieder um. Durch ctx.tanslate verschiebt sich unsere gesamter Kontext auf der X-Achse um den Wert der Variabel "camera_x" der Wert für die Verschiebung der Y- Achse muss mitangegebn werden. Dieser beträgt 0.
                                                                //Draw wird immer wieder (so schnell es die GrKa hergibt) aufgerufen.
        let self = this;                                        //
        requestAnimationFrame(function() {                      //Wir müssen in requestAni eine Funktion hineingeben, diese wird ausgeführt sobald alles darüber einmal gezeichnet wurde.
            self.draw();                                        //Die Funktion wird also A-synchron ausgeführt. Innerhalb der Funktion ist "this" unbekannt. Demnach wird eine Hilfsvariabel self = this definiert und benutzt.
        });
    }

/**
* The function "addMovableObjectsToMap()" adds movable Objects to our map.
*/
    addMovableObjectsToMap() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        
    }

/**
* The function "addStatusbarsToMap()" adds statis statusbars to our map.
*/
    addStatusbarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        
    }

/**
* The function "addObjectsToMap(objects)" iterates through an array of objects and inserts them into our game by calling the "addToMap(o)"" function .
* @param {Array} objects - The objects array contains all objects that will be inserted into our game.
*/
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);                       // Durch die forEach Schleife wird die Zeile zwischen den {} für jedes Element des enemies Arrays ausgeführt.
        });
    }

/**
* The function "addToMap(mo)" adds a moveable object to our canvas and flips the image if necessary.
* @param mo - an object that represents our moveable objects. This has X&Y coordinates as well as height and width and a direction. Insofar as the object is to run in a different direction, this is inserted via our context "this.ctx".
*/
    addToMap(mo) {
        if(mo.otherDirection) {                     // Hier schauen wir ob unser eingefügtes Objekt eine andere Richtung hat WENN ja DANN
            this.flipImage(mo);                     // Hier wird die Funktion "flipImage" aufgerufen. Sie bekommt denParameter "mo" mitgegeben. Diese dreht das Bild unseres Characters in die andere Richtung.
        }
        mo.draw(this.ctx);                          // Hier wird die Funktion "draw" aufgerufen. Sie bekommt denParameter "ctx" mitgegeben. Diese zeichnet dann unsere Bilder ins canvas.
        //mo.drawFrame(this.ctx);                   // Hier wird die Funktion "draw" aufgerufen. Sie bekommt denParameter "ctx" mitgegeben. Diese zeichnet dann die Rahmen um die bewegenden Objekte mit dessen wir prüfen können ob Objekte miteinander kollidieren.

        if(mo.otherDirection) {                     // Hier schauen wir ob unser eingefügtes Objekt eine andere Richtung hat WENN ja DANN
            this.flipImageBack(mo);                 // Hier wird die Funktion "flipImageBack" aufgerufen. Sie bekommt denParameter "mo" mitgegeben. Diese dreht das Bild unseres Characters in die ursprünglich Richtung.
        }
    }

/**
* The function "flipImage(mo)" flips an image horizontally using canvas context.
* @param mo - an object that represents our moveable objects. This has X&Y coordinates as well as height and width and a direction. Insofar as the object is to run in a different direction, this is inserted via our context "this.ctx".
*/
    flipImage(mo) {
        this.ctx.save();                        // speichern wir die aktuellen Einstellungen von unserem Kontext, damit die nächsten Bilder welche wir wieder einfügen richtig herum eingefügt werden.
        this.ctx.translate(mo.width, 0);        // Hier ändern wir die Methode wie wir die Bilder einfügen und ab jetzt werden sie gespiegelt.
        this.ctx.scale(-1, 1);                  // Durch das scale verschieben wird das Bild nochmals um seine eigene Breite nach links/rechts
        mo.x = mo.x * -1;                       // Sobald das Bild gespiegelt wird ist der 0 Punkt der X-Achse auf der rechten Seite. Dadurch dass wir mit -1 multiplizieren drehen wir die Stelle einfach um.
    }
    
/**
* The function "flipImageBack(mo)" flips an image in its original direction.
* @param mo - an object that represents our moveable objects. This has X&Y coordinates as well as height and width and a direction. Insofar as the object is to run in a different direction, this is inserted via our context "this.ctx".
*/
    flipImageBack(mo) {
        this.ctx.restore();                     // machen wir  hier unsere Einstellungen rückgängig
        mo.x = mo.x * -1;                       // Sobald das Bild gespiegelt wird ist der 0 Punkt der X-Achse auf der rechten Seite. Dadurch dass wir mit -1 multiplizieren drehen wir die Stelle einfach um.
    }
}
