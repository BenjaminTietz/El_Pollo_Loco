class DrawableObject {

    img;                    // Variabel img für Bilder
    imageCache = {};        // JSON 
    currentImage = 0;       // Variabel currentImage als Index der Bilder
    x = 120;                // Variabel X als X Koordinate
    y = 280;                // Variabel Y als Y Koordinate
    height = 150;           // Variabel height als Höhe des zu bewegenden Objektes
    width = 100;            // Variabel width als Breite des zu bewegenden Objektes
/**
 * The function "loadImage(path)" loads a new image and assigns the path to a global variable.
 * @param {String} path -  path parameter is a string that represents the URL or file path of the image which gets loaded.
 */
                                    // loadImage ('img/test.png')
    loadImage(path) {               // Funktion "loadImage" lädt Bilder, Dieser wird der Wert "path" übergeben.
        this.img = new Image();     // Der Globalen Variabel "this.img" = wird in Form fon document.getElementById('image') <id="image" src> zugewiesen.
        this.img.src = path;        // Der Globalen Variabel "this.img" wird als zu ladener Quelle = "path" zugewiesen
    }
/**
* The function "draw(ctx)" draws an image on our canvas context with specified coordinates and dimensions.
* @param {*} ctx - is used to draw or manipulate graphics on our canvas. Ctx stand for "context" and refers to the 2D rendering context of a canvas element.
*/
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // Hier wird das Bild eingefügt.
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }
/**
* The function "drawFrame(ctx)" is used during the development process to draw rectangular subframes around our moving objects.
* @param {*} ctx - is used to draw or manipulate graphics on our canvas. Ctx stand for "context" and refers to the 2D rendering context of a canvas element.
*/
    drawFrame(ctx){                                                                             // Die Funktion  drawFrame zeichnet rechteckige Rahmen um unsere bewegende Objekte       
        if(this instanceof Chicken || this instanceof BabyChicken || this instanceof ThrowableObject){    // Durch "this instanceof" als Bedingung unserer if Schleife werden die Rahme nur um die benannten Objekte gezeichnet und nicht um alle(hintergrund / Wolken)
            ctx.beginPath();            
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } else if(this instanceof Character){    // Durch "this instanceof" als Bedingung unserer if Schleife werden die Rahme nur um die benannten Objekte gezeichnet und nicht um alle(hintergrund / Wolken)
            ctx.beginPath();            
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y+80, this.width-20, this.height-80);
            ctx.stroke();
        } else if(this instanceof Bottles){    // Durch "this instanceof" als Bedingung unserer if Schleife werden die Rahme nur um die benannten Objekte gezeichnet und nicht um alle(hintergrund / Wolken)
        ctx.beginPath();            
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'green';
        ctx.rect(this.x+30, this.y+10, this.width-45, this.height-10);
        ctx.stroke();
    }else if(this instanceof Coins){   // Durch "this instanceof" als Bedingung unserer if Schleife werden die Rahme nur um die benannten Objekte gezeichnet und nicht um alle(hintergrund / Wolken)
        ctx.beginPath();            
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'green';
        ctx.rect(this.x+55, this.y+35, this.width-105, this.height-70);
        ctx.stroke();
    }else if(this instanceof Endboss){   // Durch "this instanceof" als Bedingung unserer if Schleife werden die Rahme nur um die benannten Objekte gezeichnet und nicht um alle(hintergrund / Wolken)
        ctx.beginPath();            
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x+25, this.y+65, this.width-45, this.height-70);
        ctx.stroke();
    }
}
/**
 * The function "loadImages(arr)" loads images from an array and caches them using their file paths and keys.
 * @param {Array} arr - ['img/image1.png','img/image2.png','img/image3.png',...] an array of file paths which needs to get loaded.
 */
    loadImages(arr){
        arr.forEach((path) =>{              // Für jedes Element des Arrays "arr" wird diese Schleiße mit eingegliederter Funktion aufgerufen. Der Funktion wird der Wert "path" übergeben. Dieser beinhaltet die Pfade der anzuzeigenden Bilder.
            let img = new Image();          // let img = document.getElementById('image') <id="image" src>
            img.src = path;                 // Der Globalen Variabel "this.img" wird als zu ladener Quelle = "path" zugewiesen
            this.imageCache[path] = img;    //durch das this.Variable greifen wir auf die Variable innerhalb des Objektes zu nicht auf die innerhalb der Funktion
        });
    }
}