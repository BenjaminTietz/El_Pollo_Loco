class Character extends MovableObject {
    width = 200;
    height = 250;
    y = 80;
    speed = 10;
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
    world;
    walking_sound = new Audio('audio/walk.mp3');

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages(this.IMAGES_WALKING);                       // Hier werden die übergeordnete Funktion loadImages aufgerufen. Dieser wird das Arrays "IMAGES_WALKING" übergeben woraus die Bilder unseres Characters geladen werden.
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();                                        // Funktion applyGravity wird aufgerufen.
        this.animate();                                             // Hier wird die Funktion "animate" aufgerufen.
    }

    animate () {

        setInterval(() =>{                                  // Diese "setInterval" Funktion beinhaltet 2 if Schleifen welche erfassen ob wir die linke oder rechte Pfeiltaste gedrückt haben.
            this.walking_sound.pause();                     // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {// WENN unsere rechte Pfeiltaste den Wert den Wert true hat. Duch dass && this < this.world.level.level_end_x begrenzen wir unsere Welt nach rechts und erstellen eine unsichtbare Mauer, so dass unser Character nichtmehr aus der Map herauslaufen kann.
                this.moveRight();
                this.otherDirection = false;                // Variabel "otherDirection" bekommt den Wert = "false"
                this.walking_sound.play();                  // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
            }
            if (this.world.keyboard.left && this.x > 0) {    // WENN unsere linke Pfeiltaste den Wert den Wert true hat. Duch dass && this > 0 begrenzen wir unsere Welt nach links und erstellen eine unsichtbare Mauer, so dass unser Character nichtmehr aus der Map herauslaufen kann.
                this.moveLeft();
                this.otherDirection = true;                 // Variabel "otherDirection" bekommt den Wert = "true". Wenn der Wert = "true" ist soll das Bild unseres Characters gespiegelt werden.
                this.walking_sound.play();                  // Hier wird die Variable walking_sound abgespielt an dessen der Pfad der mp3 gebunden ist.
                }
            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;            // Hier wird unsere Cameramethode an unseren Character gebunden. Jedes mal wenn wir die X-Koordinate unseres Characters verändern egal ob pos. oder neg. wird die X-Koordinate an unsere camera X-koordinate als Gegenteil gebunden. Mit den +100px verschieben wir die Kameraperspektive ein wenig nach rechts.
        }, 1000 / 60);                                      // Hier wird die Intervallgeschwindigkeit, in welcher unsere Funktion ausgeführt hat, definiert. 1000ms / 60 = 60FPS

        setInterval(() => {

            if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        },50);
    }
    jump() {
        this.speedY = 30;
    }
}