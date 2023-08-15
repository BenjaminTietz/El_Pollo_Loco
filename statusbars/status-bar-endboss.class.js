class StatusBarEndboss extends DrawableObject {

    IMAGES_EndBoss = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    energyEndboss = 15;

    constructor(){
        super();
        this.loadImages(this.IMAGES_EndBoss);
        this.loadImage(this.IMAGE_ICON_EndBoss);
        this.x = 510;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setEndBoss(100);
    }

    setEndBoss(energyEndboss) {
        this.energyEndboss = energyEndboss;
        let path = this.IMAGES_EndBoss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    resolveImageIndex(){
        if(this.energyEndboss >= 100){
            return 5;
        } else if (this.energyEndboss > 80){
            return 4;
        } else if (this.energyEndboss > 60){
            return 3;
        } else if (this.energyEndboss > 40){
            return 2;
        } else if (this.energyEndboss > 20){
            return 1;
        } else (this.energyEndboss == 0)
            return 0;
    }
}