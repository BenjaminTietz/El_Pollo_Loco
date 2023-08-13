class StatusBarBottle extends DrawableObject {

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    bottles = 5;

    constructor(){
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBottles(5);
    }

    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    resolveImageIndex(){
        if(this.bottles == 5){
            return 5;
        } else if (this.bottles >= 4){
            return 4;
        } else if (this.bottles >= 3){
            return 3;
        } else if (this.bottles >= 2){
            return 2;
        } else if (this.bottles >= 1){
            return 1;
        } else (this.bottles == 0)
            return 0;
    }
}