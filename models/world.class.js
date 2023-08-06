class World {
    character = new Character();  // Variablen definiert man innerhalb von Klassen OHNE let / var
    level = level1;
    canvas;
    ctx;                        // Variable Context wird definiert
    keyboard;
    camera_x = 0;               // Variable "camera_x" definiert wie weit wir unseren KOntext aka Welt sobald unser Character läuft verschieben.


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;               // Mit this.canvas greifen wir auf das oben definierte Variable Canvas zu und geben Ihm den Wert des "canvas" welches der Funktion als parameter übergeben wird.
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {                                             // Die Funktion "checkCollisions" prüft in einem definierten Intervall ob bewegende Objekte miteinander kollidieren. 
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {                 // Mit "this.level.enenies" bekommen wir all unsere Gegener durch "forEach" prüfen wir ob jeder der Gegner mit unserem Character kollidiert.
                if(this.character.isColliding(enemy) ) {
                    this.character.hit();
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);                   // Durch ctx.tanslate verschiebt sich unsere gesamter Kontext auf der X-Achse um den Wert der Variabel "camera_x" der Wert für die Verschiebung der Y- Achse muss mitangegebn werden. Dieser beträgt 0.

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        
        this.ctx.translate(-this.camera_x, 0);                  //Hier drehen wir die Funktion welche unseren Kontext verschieb wieder um. Durch ctx.tanslate verschiebt sich unsere gesamter Kontext auf der X-Achse um den Wert der Variabel "camera_x" der Wert für die Verschiebung der Y- Achse muss mitangegebn werden. Dieser beträgt 0.

        //Draw wird immer wieder (so schnell es die GrKa hergibt) aufgerufen.
        let self = this;                    //
        requestAnimationFrame(function() {  //Wir müssen in requestAni eine Funktion hineingeben, diese wird ausgeführt sobald alles darüber einmal gezeichnet wurde.
            self.draw();                    //Die Funktion wird also A-synchron ausgeführt. Innerhalb der Funktion ist "this" unbekannt. Demnach wird ein self = this definiert und benutzt.
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);     // Durch die forEach Schleife wird die Zeile zwischen den {} für jedes Element des enemies Arrays ausgeführt.
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
