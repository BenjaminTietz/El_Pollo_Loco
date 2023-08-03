class Level {
    enemies;
    clouds;
    backgroundObjects;

    constructor(enemies, clouds, backgroundObjects){    //Der constructor bekommt 3 Funktionsparameter übergeben
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}