class DrawableObject {

    img;                    
    imageCache = {};        
    currentImage = 0;       
    x = 120;                
    y = 280;                
    height = 150;           
    width = 100;            
    
/**
 * The function "loadImage(path)" loads a new image and assigns the path to a global variable.
 * @param {String} path -  path parameter is a string that represents the URL or file path of the image which gets loaded.
 */
                                    
    loadImage(path) {               
        this.img = new Image();    
        this.img.src = path;        
    }

/**
* The function "draw(ctx)" draws an image on our canvas context with specified coordinates and dimensions.
* @param {*} ctx - is used to draw or manipulate graphics on our canvas. Ctx stand for "context" and refers to the 2D rendering context of a canvas element.
*/
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

/**
 * The function "loadImages(arr)" loads images from an array and caches them using their file paths and keys.
 * @param {Array} arr - ['img/image1.png','img/image2.png','img/image3.png',...] an array of file paths which needs to get loaded.
 */
    loadImages(arr){
        arr.forEach((path) =>{              
            let img = new Image();          
            img.src = path;                 
            this.imageCache[path] = img;    
        });
    }
}