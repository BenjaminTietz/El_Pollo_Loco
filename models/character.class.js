class Character extends MovableObject {
    width = 175;
    height = 250;
    y = 80;
    speed = 5;
    timeOut = false;
    lastMove = 0;
    gameOverSoundPlayed = false;
    world;
    animationDuration = 2000; // 2 Sekunden
    offset = {
        top: 110,
        bottom: 10,
        left: 20,
        right: 30,
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    constructor () {                                                // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING);                       // Hier werden die übergeordnete Funktion loadImages aufgerufen. Dieser wird das Arrays "IMAGES_WALKING" übergeben woraus die Bilder unseres Characters geladen werden.
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();                                        // Funktion applyGravity wird aufgerufen.
        this.animateInterval = this.startAnimateInterval();
        this.animationDecisionInterval = this.startAnimationDecisionInterval();
        this.timeoutInterval = this.startTimeoutInterval();
        
    }

/**
* The function "startAnimateInterval()" animates our character by playing different animations based on its state.
*/
    startAnimateInterval() {
        return setInterval(() => {                                  // Diese "setInterval" Funktion beinhaltet 2 if Schleifen welche erfassen ob wir die linke oder rechte Pfeiltaste gedrückt haben.
            walking_sound.pause();                                  // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x && !this.isDead()) {// WENN unsere rechte Pfeiltaste den Wert den Wert true hat. Duch dass && this < this.world.level.level_end_x begrenzen wir unsere Welt nach rechts und erstellen eine unsichtbare Mauer, so dass unser Character nichtmehr aus der Map herauslaufen kann.
                this.walkRight();}
            if (this.world.keyboard.left && this.x > 0 && !this.isDead()) {           // WENN unsere linke Pfeiltaste den Wert den Wert true hat. Duch dass && this > 0 begrenzen wir unsere Welt nach links und erstellen eine unsichtbare Mauer, so dass unser Character nichtmehr aus der Map herauslaufen kann.
                this.walkLeft();}
            if (this.world.keyboard.space && !this.isAboveGround() && !this.isDead()) {
                this.jumping();}
            this.world.camera_x = -this.x + 100;                    // Hier wird unsere Cameramethode an unseren Character gebunden. Jedes mal wenn wir die X-Koordinate unseres Characters verändern egal ob pos. oder neg. wird die X-Koordinate an unsere camera X-koordinate als Gegenteil gebunden. Mit den +100px verschieben wir die Kameraperspektive ein wenig nach rechts.
        }, 1000 / 60);                                              // Hier wird die Intervallgeschwindigkeit, in welcher unsere Funktion ausgeführt hat, definiert. 1000ms / 60 = 60FPS
    }

/**
* The function "startAnimationDecisionInterval()" animates our character by playing different animations based on its state.
*/
    startAnimationDecisionInterval() {
        return setInterval(() => {
            if (this.isDead()) {       // Wenn der Charakter tot ist und die Animation nicht gestartet wurde
                this.heroIsDead();
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
                hurt_sound.play();
            } else if (this.isAboveGround() && !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.timeOut == true && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 150);
    }
/**
* The function "walkLeft()" animates our character by moving him to the left side.
*/

    walkLeft() {
        if (!soundSettingsActive){
            this.moveLeft();
            }
        this.lastMove = new Date().getTime();
        this.otherDirection = true;                         // Variabel "otherDirection" bekommt den Wert = "true". Wenn der Wert = "true" ist soll das Bild unseres Characters gespiegelt werden.
        walking_sound.play();                               // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
        }

/**
* The function "walkRight()" animates our character by moving him to the right side.
*/
    walkRight() {
        if (!soundSettingsActive){
            this.moveRight();
            }
        this.lastMove = new Date().getTime();
        this.otherDirection = false;                        // Variabel "otherDirection" bekommt den Wert = "false"
        walking_sound.play();                               // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
    }

/**
* The function "jumping()" animates our character and let him jump into the air.
*/
    jumping() {
        this.lastMove = new Date().getTime();
        this.jump();
        jumping_sound.play();  
    }

/**
* The function "heroIsDead()" animates our character by playing different animations based on its state, stopps certain intervall functions and shows the game over endscreen.
*/
    heroIsDead() {
        this.playAnimation(this.IMAGES_DEAD);               // Starten Sie die Todesanimation
                dead_sound.play();
                setTimeout(() => {
                    this.clearAllIntervals();
                    this.world.endboss.clearAllIntervals();
                }, this.animationDuration);
                setTimeout(() =>{
                    showEndScreenLoose();                   // Nach 2 Sekundenwird der Game Over Screen-Funktion aufrufen
                    if (!this.gameOverSoundPlayed) {
                        this.gameOverSoundPlayed = true;
                        you_lost_sound.play(); 
                    }
                }, this.animationDuration);
    }
/**
* The function "jump()" assigns a vertical speed to our character when he jumps.
*/   
    jump() {                                                // Die "jump" Funktion wird benötigt um unseren Character springen zu lassen...
        this.speedY = 30;                                   // Der Variabel "speedY" aka Geschwindigkeit auf der Y-Achse wird der Wert 30 (Pixel) zugewiesen
    }

/**
* The function "startTimeoutInterval()" checks at an interval whether and when our character last moved in order to be able to play the desired animations.
*/
    startTimeoutInterval() {
        return setInterval(() => {
            let timePassed = new Date().getTime() - this.lastMove;              // Differenz in ms  timePassed entspicht = aktuelle Zeit in ms seitdem 01.01.1970 - "lastMove" Zeit in ms wo wir uns zuletzt bewegt haben
            if (this.lastMove == 0) {
                timePassed = 0;
            }else timePassed = timePassed / 1000;                                 // Differenz in s
            if (timePassed <= 5) {
                this.timeOut = false;
            } else if (timePassed => 5) {
                this.timeOut = true;
            } 
        },500);                                     
    }
    
/**
* The function "clearAllIntervals()" stops the desired interval functions.
*/
    clearAllIntervals() {
        clearInterval(this.animateInterval);
        clearInterval(this.animationDecisionInterval);
        clearInterval(this.timeoutInterval);
    }
}