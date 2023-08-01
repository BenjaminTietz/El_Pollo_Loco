class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        
        super().loadImage('img/5_background/layers/4_clouds/1.png',);  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= 0.2;
            },1000 / 60);    // 60FPS verändert sich die x Koordinate um -0,2
    }
}