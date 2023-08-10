class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    bottles;
    coins;

    constructor(enemies, clouds, backgroundObjects, bottles, coins){    //Der constructor bekommt 4 Funktionsparameter übergeben
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}