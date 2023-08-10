class Coins extends DrawableObject {

    width = 150;
    height = 100;
    y = 40;
    x = 200;
    IMAGES_CoinInAir = [
        'img/8_coin/coin_1.png'
    ];

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super();
        this.loadImage(this.IMAGES_CoinInAir); 
        this.x = 200 + Math.random() * 2200;
        this.y = 40 + Math.random() * 50;     
    }

}