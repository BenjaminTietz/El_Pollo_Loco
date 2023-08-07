class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    collectables;

    constructor(enemies, clouds, backgroundObjects, collectables){    //Der constructor bekommt 4 Funktionsparameter übergeben
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
    }
}