class Bottles extends MovableObject {

    width = 100;
    height = 60;
    y = 360;
    x = 200;
    offset = {
        top: 10,
        bottom: 0,
        left: 20,
        right: 10,
    };
    IMAGES_BottleOnGround = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor () {                                                            // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BottleOnGround); 
        
        this.x = 200 + Math.random() * 2200;  
        this.animate();      
    }
    animate () {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BottleOnGround);
        }, 200);
    }
}
