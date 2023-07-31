class World {
    character = new Character();  // Variablen definiert man innerhalb von Klassen OHNE let / var
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas;
    ctx;                        // Variable Context wird definiert

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;               // Mit this.canvas greifen wir auf das oben definierte Variable Canvas zu und geben Ihm den Wert des "canvas" welches der Funktion als parameter übergeben wird.
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        

        //Draw wird immer wieder (so schnell es die GrKa hergibt) aufgerufen.
        let self = this;                    //
        requestAnimationFrame(function() {  //Wir müssen in requestAni eine Funktion hineingeben, diese wird ausgeführt sobald alles darüber einmal gezeichnet wurde.
            self.draw();                    //Die Funktion wird also A-synchron ausgeführt. Innerhalb der Funktin ist "this" unbekannt. Demnach wird ein self = this definiert und benutzt.
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);     // Durch die forEach Schleife wird die Zeile zwischen den {} für jedes Element des enemies Arrays ausgeführt.
        });
    }
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height,);
    }
}
