class Character extends MovableObject {
    width = 200;
    height = 250;
    y = 180;
    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
        this.loadImages([
            'img/2_character_pepe/2_walk/W-21.png',
            'img/2_character_pepe/2_walk/W-22.png',
            'img/2_character_pepe/2_walk/W-23.png',
            'img/2_character_pepe/2_walk/W-24.png',
            'img/2_character_pepe/2_walk/W-25.png',
            'img/2_character_pepe/2_walk/W-26.png'
        ]); 
    }

    jump() {             //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!

    }
}