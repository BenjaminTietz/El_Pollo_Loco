class Chicken extends MovableObject {
    width = 100;
    height = 60;
    y = 360;
    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        
        this.x = 200 + Math.random() * 500;  //200px Werten als linker max Wert mit (Math.random * 500px) addiert. Hier wird ein zufälligen Wert zwischen 0 & 1  generiert.
        this.animate();
    }

    animate() {
        setInterval(() => {
        this.x -= 0.2;
        },1000 / 60);    // 60FPS verändert sich die x Koordinate um -0,2
    }
}