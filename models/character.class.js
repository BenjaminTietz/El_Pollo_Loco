class Character extends MovableObject {

    constructor () {    // constructor wird als erstes ausgeführt wenn ein Objekt neu erstellt wird
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');  // durch "super." wird von der übergeorneten Klasse eine Funktion aufgerufen
    }

    jump() {             //Innerhalb von Klassen muss man bei Funktionen KEIN function .... mehr benutzen!

    }
}