class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    bottles;
    coins;

    constructor(enemies, endboss, clouds, backgroundObjects, bottles, coins){    
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}