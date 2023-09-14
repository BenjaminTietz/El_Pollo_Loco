class World {
    character = new Character();            
    level = level1;
    endboss = this.level.endboss[0];
    canvas;
    ctx;                                    
    keyboard;
    camera_x = 0;                           
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottle = [];
    bottleOnGround = new Bottles();
    coinInAir = new Coins();
    canThrow = true;
    throwTime = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;              
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

/**
* The function "setWorld()" defines our world with given global variables.
*/
    setWorld() {
        this.character.world = this;
        this.endboss.world  = this;
    }

/**
* The function "run()" executes functions at a defined interval, which are used to check for collisions, for example.
*/
    run() {                                              
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionEndboss();
            this.checkThrowObjects();
            this.checkCollectionCoins();
            this.checkCollectionBottle();
            this.checkBottleHitsEndBoss();
            this.checkcoinIsCollected();
            this.checkBottleHitsChicken();
            this.checkCollisionPosition();
        }, 50);
    }

/**
* The function "checkThrowObjects()" checks whether throwable objects are available and lets us insert them into the game by pressing the D key and then deletes them from the "throwableObjects" array and plays a sound.
*/
    checkThrowObjects(){                                                                            
        if(this.keyboard.d && this.collectedBottle.length > 0 && this.canThrow) {
            this.bottleHandling();
                setInterval(() => {
                    this.throwTime++;
                    if (this.throwTime > 15) {
                        this.canThrow = true;
                        this.throwTime = 0;
                    }
                }, 100);
            }
}

/**
* The function "bottleHandling()" handels creation and deletation of our throwable bottles.
*/ 
    bottleHandling(){
        this.character.lastMove = new Date().getTime();
        let collectedBottle = new ThrowableObject (this.character.x + 100, this.character.y + 100);  
        this.character.ammountOfBottles --;                                                            
        this.statusBarBottle.setBottles(this.character.ammountOfBottles);                   
        this.throwableObjects = this.throwableObjects.splice(0, 1);                         
        this.throwableObjects.push(collectedBottle);                                        
        this.collectedBottle.splice(0, 1);                                                    
        throw_bottle_sound.play();
        this.canThrow = false;
    }

/**
* The function "checkCollisions()" checks if objects from our enemies array collide with our character under certain conditions.
*/
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {                 
            if(this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()){
                    this.checkKillChickenFromTop();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
* The function "checkCollisionEndboss()" checks if our character is colliding with the endboss.
*/
    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {                  
            if(this.character.isColliding(endboss) ) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

/**
* The function "checkCollectionCoins()" checks if our character is colliding with our collectable coins and calls another function wich adds the coins to our ammount of collected coins.
*/
    checkCollectionCoins() {
        this.level.coins.forEach((coins) => {                 
            if(this.character.isColliding(coins) ) {
                this.character.isCollectingCoins(); 
                this.statusBarCoins.setCoins(this.character.coins);
            }
        });
    }

/**
* The function "checkcoinIsCollected()" iterates through our coin array and deletes the coins from the array that have already been collected.
*/
    checkcoinIsCollected() {
            for (let i = 0; i < this.level.coins.length; i++) {
            const coins = this.level.coins[i];
            if (this.character.isColliding(coins)) {
                this.level.coins.splice(i, 1);
            }
        }
    }

/**
* The function "checkCollectionBottle()" checks if our character is colliding with our collectable bottles and calls another function wich adds the bottles to our ammount of collected bottles.
*/
    checkCollectionBottle() {
        this.level.bottles.forEach((bottles) => {                 
            if(this.character.isColliding(bottles) ) {
                this.bottleIsCollected();
                this.character.isCollectingBottles(); 
                this.collectedBottle = this.collectedBottle.splice(0, 9);
                this.collectedBottle.push(bottles);
                this.statusBarBottle.setBottles(this.character.ammountOfBottles);
            }
        });
    }

/**
* The function "bottleIsCollected()" iterates through our collectedBottle array and deletes them from the array if they have already been collected.
*/
    bottleIsCollected() {
        if (this.collectedBottle.length < 10) {
            for (let i = 0; i < this.level.bottles.length; i++) {
                const bottles = this.level.bottles[i];
                if (this.character.isColliding(bottles)) {
                    this.level.bottles.splice(i, 1);
                }
            }
        }
    }

/**
* The function "checkBottleHitsEndBoss()" iterates through throwableObjects array and checks if the throwableObjects are colliding with our endboss. If so it calls a function "hitEndBoss" to decrease the enrgy of the endboss and refresh the statusbar.
*/
    checkBottleHitsEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss)) {
                    endboss.hitEndBoss();
                    this.statusBarEndboss.setEndBoss(endboss.energy);
                    setTimeout(() =>{
                        this.deleteThrownBottle(bottle);
                        },180);
                }
            });
        });
    }

/**
* The function "checkBottleHitsChicken()" iterates through throwableObjects array and checks if the throwableObjects are colliding with our enemies. If so it calls a function "hitChicken" to decrease the enrgy of the enemy.
*/
    checkBottleHitsChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemies) => {
                if (bottle.isColliding(enemies)) {
                    enemies.hitChicken();
                    setTimeout(() =>{
                    this.deleteEnemy(enemies);
                    },500);
                }
            });
        });
    }

/**
* The function "checkKillChickenFromTop()" iterates through enemies array and checks if our character is colliding under certain circumstances with our enemies. If so it calls a function "hitChicken" to decrease the enrgy of the enemy. 
* The function "jumpAfterKill() is also called, which makes our character jump after hitting a chicken from above. After that, the chicken will be deleted from the enemies array.
*/
    checkKillChickenFromTop() {
        this.level.enemies.forEach((enemies) => {
            if (this.character.isColliding(enemies) && this.character.isAboveGround() && !this.character.isHurt()) {
                if (enemies.energy == 100) {
                enemies.hitChicken();
                chicken_kill_sound.play();
                this.character.jumpAfterKill();
                setTimeout(() => {
                    this.deleteEnemy(enemies);
                }, 500);
            }
            }
        });
    }

/**
* The function "checkCollisionPosition()" checks if our character is in the air. If so, the checkKillChickenFromTop() function is called, otherwise the checkCollisions() function is executed.
*/
    checkCollisionPosition() {
        if (this.character.isAboveGround()) {
            this.checkKillChickenFromTop();
        } else {
            this.checkCollisions();
        }
    }

/**
* The function "deleteEnemy(enemies)" assigns an index to the opponent within the array. And then delete it at the appropriate position.
* @param {Array} enemies - The "enemies" array contains all of our chicken enemies.
*/
    deleteEnemy(enemies) {
        let i = this.level.enemies.indexOf(enemies);
        this.level.enemies.splice(i, 1);
    }

/**
 * The function "deleteThrownBottle(bottle)" assigns an index to the thrown within the array. And then delete it at the appropriate position.
 * @param {Array} throwableObjects - The "throwableObjects" array
 */
    deleteThrownBottle(bottle) {
        let i = this.throwableObjects.indexOf(bottle);
        this.throwableObjects.splice(i, 1);
    }

/**
* The function "draw()" inserts graphics into our canvas.
*/
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);                   
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addMovableObjectsToMap();
        this.ctx.translate(-this.camera_x, 0); 
        this.addStatusbarsToMap();
        this.ctx.translate(this.camera_x, 0);  
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);                  
        let self = this;                                        
        requestAnimationFrame(function() {                      
            self.draw();                                        
        });
    }

/**
* The function "addMovableObjectsToMap()" adds movable Objects to our map.
*/
    addMovableObjectsToMap() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        
    }

/**
* The function "addStatusbarsToMap()" adds statis statusbars to our map.
*/
    addStatusbarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        
    }

/**
* The function "addObjectsToMap(objects)" iterates through an array of objects and inserts them into our game by calling the "addToMap(o)"" function .
* @param {Array} objects - The objects array contains all objects that will be inserted into our game.
*/
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);                      
        });
    }

/**
* The function "addToMap(mo)" adds a moveable object to our canvas and flips the image if necessary.
* @param mo - an object that represents our moveable objects. This has X&Y coordinates as well as height and width and a direction. Insofar as the object is to run in a different direction, this is inserted via our context "this.ctx".
*/
    addToMap(mo) {
        if(mo.otherDirection) {                     
            this.flipImage(mo);                     
        }
        mo.draw(this.ctx);                                             

        if(mo.otherDirection) {                     
            this.flipImageBack(mo);                 
        }
    }

/**
* The function "flipImage(mo)" flips an image horizontally using canvas context.
* @param mo - an object that represents our moveable objects. This has X&Y coordinates as well as height and width and a direction. Insofar as the object is to run in a different direction, this is inserted via our context "this.ctx".
*/
    flipImage(mo) {
        this.ctx.save();                        
        this.ctx.translate(mo.width, 0);        
        this.ctx.scale(-1, 1);                  
        mo.x = mo.x * -1;                       
    }
    
/**
* The function "flipImageBack(mo)" flips an image in its original direction.
* @param mo - an object that represents our moveable objects. This has X&Y coordinates as well as height and width and a direction. Insofar as the object is to run in a different direction, this is inserted via our context "this.ctx".
*/
    flipImageBack(mo) {
        this.ctx.restore();                     
        mo.x = mo.x * -1;                       
    }
}
