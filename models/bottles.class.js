class Bottles extends DrawableObject {

    width = 100;
    height = 60;
    y = 360;
    x = 200;
    IMAGES_BottleOnGround = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super();
        this.loadImage(this.IMAGES_BottleOnGround); 
        this.x = 200 + Math.random() * 2200;        
    }

}
