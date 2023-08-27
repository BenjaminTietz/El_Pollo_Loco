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

    setWorld() {
        this.character.world = this;
        this.endboss.world  = this;
    }

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
        }, 200);
    }

    checkThrowObjects(){                                                                            // checkThrowobjects prüft ob die Taste d gedrückt wird und die Anzahl der Flaschen größer 0 ist
        if(this.keyboard.d) {
            if (this.character.ammountOfBottles > 0){
                let bottle = new ThrowableObject (this.character.x + 100, this.character.y + 100);  // der Funktionsvariabel "bottle" wird ein neues zu werfendes Objekt zugewiesen, dieses wird an definierten Koordinaten eingefügt
                this.character.ammountOfBottles--;                                                  // hier wird die Anzahl der verfügbaren Flaschen reduziert            
                this.statusBarBottle.setBottles(this.character.ammountOfBottles);                   // hier wird die Statusbar der Flaschen geupdated
                this.throwableObjects = this.throwableObjects.splice(0, 1);                         // hier wird aus dem Array "throwableObjects" ein Objekt entfernt
                this.throwableObjects.push(bottle);                                                 // hier wird dem Array "throwableObjects" ein Objekt hinzugefügt
                this.collectedBottle.splice(0, 1);                                                  // hier wird aus dem Array "collectedBottle" ein Objekt entfernt   
                this.throw_bottle_sound.play();
            }
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {                 // Mit "this.level.enenies" bekommen wir all unsere Gegener durch "forEach" prüfen wir ob jeder der Gegner mit unserem Character kollidiert.
            if(this.character.isColliding(enemy) ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Is colliding with:',this.level.enemies);
            }
        });
    }

    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {                 // Mit "this.level.enenies" bekommen wir all unsere Gegener durch "forEach" prüfen wir ob jeder der Gegner mit unserem Character kollidiert.
            if(this.character.isColliding(endboss) ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log('Is colliding with:',this.level.enemies);
            }
        });
    }

    checkCollectionCoins() {
        this.level.coins.forEach((coins) => {                 // Mit "this.level.coins" bekommen wir all unsere Coins die wir einsammeln können durch "forEach" prüfen wir ob jeder der Gegenstände mit unserem Character kollidiert.
            if(this.character.isColliding(coins) ) {
                this.character.isCollectingCoins(); 
                this.statusBarCoins.setCoins(this.character.coins);
                console.log('Collected coins:',this.character.coins);
            }
        });
    }

    checkcoinIsCollected() {
            for (let i = 0; i < this.level.coins.length; i++) {
            const coins = this.level.coins[i];
            if (this.character.isColliding(coins)) {
                this.level.coins.splice(i, 1);
            }
        }
    }


    checkCollectionBottle() {
        this.level.bottles.forEach((bottles) => {                 // Mit "this.level.bottles" bekommen wir all unsere Gegenstände die wir einsammeln können durch "forEach" prüfen wir ob jeder der Gegenstand mit unserem Character kollidiert.
            if(this.character.isColliding(bottles) ) {
                this.bottleIsCollected();
                this.character.isCollectingBottles(); 
                this.collectedBottle = this.collectedBottle.splice(0, 4);
                this.collectedBottle.push(bottles);
                this.statusBarBottle.setBottles(this.character.ammountOfBottles);
                //console.log('Is colliding with:',this.level.bottles);
            }
        });
    }

    bottleIsCollected() {
        if (this.collectedBottle.length < 5) {
            for (let i = 0; i < this.level.bottles.length; i++) {
            const bottles = this.level.bottles[i];
            if (this.character.isColliding(bottles)) {
                this.level.bottles.splice(i, 1);
            }
        }
    }
}


    checkBottleHitsEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    endboss.hitEndBoss();
                    this.statusBarEndboss.setEndBoss(endboss.energy);
                }
            });
        });
    }

    checkBottleHitsChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemies) => {
                if (bottle.isColliding(enemies)) {
                    enemies.hitChicken();
                    console.log('Bottle hits',this.level.enemies);
                }
            });
        });
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);                   // Durch ctx.tanslate verschiebt sich unsere gesamter Kontext auf der X-Achse um den Wert der Variabel "camera_x" der Wert für die Verschiebung der Y- Achse muss mitangegebn werden. Dieser beträgt 0.

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); 
        //------------------------------------------------- //Hier können fixierte Objekte eingebunden werden.
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);  

        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);                  //Hier drehen wir die Funktion welche unseren Kontext verschieb wieder um. Durch ctx.tanslate verschiebt sich unsere gesamter Kontext auf der X-Achse um den Wert der Variabel "camera_x" der Wert für die Verschiebung der Y- Achse muss mitangegebn werden. Dieser beträgt 0.

        //Draw wird immer wieder (so schnell es die GrKa hergibt) aufgerufen.
        let self = this;                                //
        requestAnimationFrame(function() {              //Wir müssen in requestAni eine Funktion hineingeben, diese wird ausgeführt sobald alles darüber einmal gezeichnet wurde.
            self.draw();                                //Die Funktion wird also A-synchron ausgeführt. Innerhalb der Funktion ist "this" unbekannt. Demnach wird eine Hilfsvariabel self = this definiert und benutzt.
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);                       // Durch die forEach Schleife wird die Zeile zwischen den {} für jedes Element des enemies Arrays ausgeführt.
        });
    }
    addToMap(mo) {
        if(mo.otherDirection) {                     // Hier schauen wir ob unser eingefügtes Objekt eine andere Richtung hat WENN ja DANN
            this.flipImage(mo);                     // Hier wird die Funktion "flipImage" aufgerufen. Sie bekommt denParameter "mo" mitgegeben. Diese dreht das Bild unseres Characters in die andere Richtung.
        }
        mo.draw(this.ctx);                          // Hier wird die Funktion "draw" aufgerufen. Sie bekommt denParameter "ctx" mitgegeben. Diese zeichnet dann unsere Bilder ins canvas.
        mo.drawFrame(this.ctx);                     // Hier wird die Funktion "draw" aufgerufen. Sie bekommt denParameter "ctx" mitgegeben. Diese zeichnet dann die Rahmen um die bewegenden Objekte mit dessen wir prüfen können ob Objekte miteinander kollidieren.

        if(mo.otherDirection) {                     // Hier schauen wir ob unser eingefügtes Objekt eine andere Richtung hat WENN ja DANN
            this.flipImageBack(mo);                 // Hier wird die Funktion "flipImageBack" aufgerufen. Sie bekommt denParameter "mo" mitgegeben. Diese dreht das Bild unseres Characters in die ursprünglich Richtung.
        }
    }

    flipImage(mo) {
        this.ctx.save();                        // speichern wir die aktuellen Einstellungen von unserem Kontext, damit die nächsten Bilder welche wir wieder einfügen richtig herum eingefügt werden.
        this.ctx.translate(mo.width, 0);        // Hier ändern wir die Methode wie wir die Bilder einfügen und ab jetzt werden sie gespiegelt.
        this.ctx.scale(-1, 1);                  // Durch das scale verschieben wird das Bild nochmals um seine eigene Breite nach links/rechts
        mo.x = mo.x * -1;                       // Sobald das Bild gespiegelt wird ist der 0 Punkt der X-Achse auf der rechten Seite. Dadurch dass wir mit -1 multiplizieren drehen wir die Stelle einfach um.
    }
    flipImageBack(mo) {
        this.ctx.restore();                     // machen wir  hier unsere Einstellungen rückgängig
        mo.x = mo.x * -1;                       // Sobald das Bild gespiegelt wird ist der 0 Punkt der X-Achse auf der rechten Seite. Dadurch dass wir mit -1 multiplizieren drehen wir die Stelle einfach um.
    }
}
