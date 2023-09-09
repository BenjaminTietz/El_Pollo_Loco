class Coins extends MovableObject{

    width = 150;
    height = 100;
    y = 40;
    x = 200;
    offset = {
        top: 40,
        bottom: 40,
        left: 30,
        right: 30,
    };
    IMAGES_CoinInAir = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_CoinInAir); 
        this.x = 200 + Math.random() * 2200;
        this.y = 40 + Math.random() * 50;  
        this.animate();   
    }
/**
* The function "animate ()" animates our chicken by playing different animations based on its state.
*/
    animate () {
        setInterval(() => {
            this.playAnimation(this.IMAGES_CoinInAir);
        }, 1000 / 60);
    }
}