class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};       // JOSN 
    currentImage = 0;
    speed = 0.15;

    // loadImage ('img/test.png')
    loadImage(path) {
        this.img = new Image();  // this.img = document.getElementById('image') <id="image" src>
        this.img.src = path;
    }
/**
 * 
 * @param {Array} arr - ['img/image1.png','img/image2.png','img/image3.png',...]
 */
    loadImages(arr){
        arr.forEach((path) =>{
            let img = new Image();    // let img = document.getElementById('image') <id="image" src>
            img.src = path;
            this.imageCache[path] = img;    //durch das this.Variable greifen wir auf die Variable innerhalb des Objektes zu nicht auf die innerhalb der Funktion
        });
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            },1000 / 60);    // 60FPS verändert sich die x Koordinate um -0,2
    }
}