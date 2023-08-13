class StatusBarCoins extends DrawableObject {

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    coins = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    resolveImageIndex(){
        if(this.coins == 10){
            return 5;
        } else if (this.coins >= 8){
            return 4;
        } else if (this.coins >= 6){
            return 3;
        } else if (this.coins >= 4){
            return 2;
        } else if (this.coins >= 2){
            return 1;
        } else (this.coins == 0)
            return 0;
    }
}