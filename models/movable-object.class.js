class MovableObject extends DrawableObject {

    speed = 0.15;           
    speedEndboss = 4;
    otherDirection = false; 
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    ammountOfBottles = 0;
    coins = 0;
    world;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * The function "applyGravity()" checks in a defined interval whether our character is on the ground or whether the vertical acceleration is greater than 0 and simulates gravity.
     */
    applyGravity(){                                         
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){    
                this.y -= this.speedY;                      
                this.speedY -= this.acceleration;           
            }
        }, 1000 / 25);                                      
    }

    /**
     * The function "isAboveGround()" checks if our charater is in the air and returns this as a boolean value. Throwable objects always get the value "true"
     */
    isAboveGround(){                                    
        if (this instanceof ThrowableObject) {          
            return true;
        } else {
        return this.y < 180;
        }
    }

    /**
     * The function "playAnimation(images) "uses the modulo operator to iterate over the image arrays of our animations. The images parameter corresponds to our storage location.
     * @param {*} images 
     */
    playAnimation(images) {
        // Walk animation
        let i = this.currentImage % images.length;             
        let path = images[i];                                               
        this.img = this.imageCache[path];                                   
        this.currentImage++;                                                
    }

    /**
     * The function "moveRight()" lets our character & endboss move to the right in a defined speed
     */
    moveRight() {
        if(this instanceof Endboss) {
            this.x += this.speedEndboss;  
        } else { 
            this.x += this.speed;                       
        }
    }

    /**
     * The function "moveRight()" lets our character & endboss move to the left in a defined speed.
     */
    moveLeft() {
        if(this instanceof Endboss) {
            this.x -= this.speedEndboss;                       
        } else {
            this.x -= this.speed;                       
        }
    }

    /**
     * The function "jump()" defines the vertical speed to make our character jump.
     */
    jump() {                                       
        this.speedY = 40;
    }

    /**
     * The function "jumpAfterKill()" defines the vertical speed to make our character jump after he killed a chicken from the top.
     */
    jumpAfterKill() {
        this.speedY = 25;
    }

    /**
     * The function "hit()" drains energy from our character after a collision, making sure the energy can be at least 0 and sets a timestamp when the last collision was.
     */
    hit() {                                           
            this.energy -= 20;                          
        if (this.energy <= 0) {                      
            this.energy = 0;                            
        } else {
            this.lastHit = new Date().getTime();    
        }
    }

    /**
     * The function "hitEndBoss()" drains energy from the endboss after a collision, making sure the energy can be at least 0 and sets a timestamp when the last collision was.
     */
    hitEndBoss() {   
        if (this.isHurt()) {                                         
            this.energy -= 10;                          
        } if (this.energy <= 0) {                      
            this.energy = 0;                            
        } else {
            this.lastHit = new Date().getTime();    
        }
    }

    /**
     * The function "hitChicken()" drains energy from the chickens after a collision, making sure the energy can be at least 0 and sets a timestamp when the last collision was.
     */
    hitChicken() {                                             
        this.energy -= 100;                          
        if (this.energy <= 0) {                     
            this.energy = 0;                        
        } 
    }

    /**
     * The function "isDead()" returns a boolean value as soon as the energy level equals 0.
     */
    isDead() {
        return this.energy == 0;                            
    }

    /**
     * The function "isCollectingCoins()" checks how many coins we have collected and adds coins if the condition is not met and plays a sound.
     */
    isCollectingCoins() {
        if (this.coins < 10 ) {
            this.coins +=  1;
            collect_coin_sound.play();
        }
    }

    /**
     * The function "isCollectingBottles()" checks how many bottles we have collected and adds bottles if the condition is not met and plays a sound.
     */
    isCollectingBottles() {
        if (this.ammountOfBottles < 10 ) {
            this.ammountOfBottles += 1;
            collect_bottle_sound.play();
        }
    } 

    /**
     * The function "isHurt()" returns a boolean value if we haven't collided with the enemy in the last 1 second
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;       
        timePassed = timePassed / 1000;                             
        return timePassed < 1;                                      
    }
    
/**
 * The function "isColliding(mo)" checks whether the objects to be moved in our game collide with each other. The objects have an X & Y coordinate and defined heights & widths as well as offset factors.
 * @param {*} mo is a moving object of our game . The objects have an X & Y coordinate and defined heights & widths as well as correction factors. The method isColliding checks if 2 objects colliding into each other.
 * @returns returns a boolean value when 2 objects collide
 */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }
}
