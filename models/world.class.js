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
    }

    setWorld() {
        this.character.world = this;
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
            this.ctx.save();                        // speichern wir die aktuellen Einstellungen von unserem Kontext, damit die nächsten Bilder welche wir wieder einfügen richtig herum eingefügt werden.
            this.ctx.translate(mo.width, 0);        // Hier ändern wir die Methode wie wir die Bilder einfügen und ab jetzt werden sie gespiegelt.
            this.ctx.scale(-1, 1);                  // Durch das scale verschieben wird das Bild nochmals um seine eigene Breite nach links/rechts
            mo.x = mo.x * -1;                       // Sobald das Bild gespiegelt wird ist der 0 Punkt der X-Achse auf der rechten Seite. Dadurch dass wir mit -1 multiplizieren drehen wir die Stelle einfach um.
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height,);  // Hier wird das Bild eingefügt.

        if(mo.otherDirection) {                     // Hier schauen wir ob unser eingefügtes Objekt eine andere Richtung hat WENN ja DANN
            this.ctx.restore();                     // machen wir  hier unsere Einstellungen rückgängig
            mo.x = mo.x * -1;                       // Sobald das Bild gespiegelt wird ist der 0 Punkt der X-Achse auf der rechten Seite. Dadurch dass wir mit -1 multiplizieren drehen wir die Stelle einfach um.
        }
    }
}
