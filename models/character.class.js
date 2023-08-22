class Character extends MovableObject {
    width = 175;
    height = 250;
    y = 80;
    speed = 10;
    timeOut = false;
    lastMove = 0;
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
    world;
    walking_sound = new Audio('audio/walk.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/dead.mp3');
    

    constructor () {                                                // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING);                       // Hier werden die übergeordnete Funktion loadImages aufgerufen. Dieser wird das Arrays "IMAGES_WALKING" übergeben woraus die Bilder unseres Characters geladen werden.
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();                                        // Funktion applyGravity wird aufgerufen.
        this.setTimeOut();
        this.animate();                                             // Hier wird die Funktion "animate" aufgerufen.
        
    }

    animate () {

        setInterval(() =>{                                  // Diese "setInterval" Funktion beinhaltet 2 if Schleifen welche erfassen ob wir die linke oder rechte Pfeiltaste gedrückt haben.
            this.walking_sound.pause();                     // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {// WENN unsere rechte Pfeiltaste den Wert den Wert true hat. Duch dass && this < this.world.level.level_end_x begrenzen wir unsere Welt nach rechts und erstellen eine unsichtbare Mauer, so dass unser Character nichtmehr aus der Map herauslaufen kann.
                this.moveRight();
                this.lastMove = new Date().getTime();
                this.otherDirection = false;                // Variabel "otherDirection" bekommt den Wert = "false"
                this.walking_sound.play();                  // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
            }
            if (this.world.keyboard.left && this.x > 0) {    // WENN unsere linke Pfeiltaste den Wert den Wert true hat. Duch dass && this > 0 begrenzen wir unsere Welt nach links und erstellen eine unsichtbare Mauer, so dass unser Character nichtmehr aus der Map herauslaufen kann.
                this.moveLeft();
                this.lastMove = new Date().getTime();
                this.otherDirection = true;                 // Variabel "otherDirection" bekommt den Wert = "true". Wenn der Wert = "true" ist soll das Bild unseres Characters gespiegelt werden.
                this.walking_sound.play();                  // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
                }
            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.lastMove = new Date().getTime();
                this.jump();
                this.jumping_sound.play();  
            }
            this.world.camera_x = -this.x + 100;            // Hier wird unsere Cameramethode an unseren Character gebunden. Jedes mal wenn wir die X-Koordinate unseres Characters verändern egal ob pos. oder neg. wird die X-Koordinate an unsere camera X-koordinate als Gegenteil gebunden. Mit den +100px verschieben wir die Kameraperspektive ein wenig nach rechts.
        }, 1000 / 60);                                      // Hier wird die Intervallgeschwindigkeit, in welcher unsere Funktion ausgeführt hat, definiert. 1000ms / 60 = 60FPS

        setInterval(() => {                                 // Diese "setInterval" Funktion beinhaltet eine if -else Abfrage um zu prüfen.....
            if(this.isDead()) {                             // Wenn die übergeordnete Funktion "isDead" = "true returned" DANN
                this.playAnimation(this.IMAGES_DEAD);       // ... wird die Animation mit den Bildern Images_Dead abgespielt
                //this.dead_sound.play(); 
            } else if(this.isHurt()){                       // Wenn die übergeordnete Funktion "isHurt" = "true returned" DANN
                this.playAnimation(this.IMAGES_HURT);       // ... wird die Animation mit den Bildern Images_Hurt abgespielt
                //this.hurt_sound.play(); 
            } else if(this.isAboveGround()) {                                   //..ob sich unser Character oberhalb des Bodens befindet.....
                this.playAnimation(this.IMAGES_JUMPING);                        // um dann die Animation mit den Bildern abzuspielen wo er springt
            } else if (this.world.keyboard.right || this.world.keyboard.left) {                                                            // ANDERNFALLS (character ist am Boden)
                this.playAnimation(this.IMAGES_WALKING);                                                           // abfrage ob die Pfeiltaste nach links oder rechts aktiv ist....
                                                                               //... um dann die Animation mit den Bildern abzuspielen wo er geht
            } else if (this.timeOut == true) {    
                this.playAnimation(this.IMAGES_IDLE_LONG);                   
            } else  {    
                this.playAnimation(this.IMAGES_IDLE);                   
            }
        },125);
    }



    jump() {                                                // Die "jump" Funktion wird benötigt um unseren Character springen zu lassen...
        this.speedY = 30;                                   // Der Variabel "speedY" aka Geschwindigkeit auf der Y-Achse wird der Wert 30 (Pixel) zugewiesen
    }

    setTimeOut() {
        setInterval (() =>{
        let timePassed = new Date().getTime() - this.lastMove;              // Differenz in ms  timePassed entspicht = aktuelle Zeit in ms seitdem 01.01.1970 - "lastMove" Zeit in ms wo wir zueltzt vom Gegner getroffen wurden
            
            if (this.lastMove == 0) {
                timePassed = 0;
            }else timePassed = timePassed / 1000;                                 // Differenz in s
            console.log('Character moved sec ago',timePassed);
            if (timePassed <= 5) {
                this.timeOut = false;
            } else if (timePassed => 5) {
                this.timeOut = true;
            } 
        },500);                                     
    }
}