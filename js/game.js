let canvas;
let world;
let keyboard = new Keyboard();
let checkFullscreen = false;

function init () {
    canvas = document.getElementById('canvas');                 // An die Variabel "canvas" wird das HTML Elemet 'canvas' gebunden.
    world = new World(canvas, keyboard);                        // An die Variabel "world" wird das neue Objekt namens 'World' gebunden, dieser geben wir 'canvas' & 'keyboard' als Variabel mit.
}

window.addEventListener("keydown", (e) => {                      // Der EventListner "keydown" gibt den Variabeln der Tasten den Wert "true" sobald eine Taste gedrückt wird
    if(e.keyCode == 39) {
        keyboard.right = true;
    }
    if(e.keyCode == 37) {
        keyboard.left = true;
    }
    if(e.keyCode == 38) {
        keyboard.up = true;
    }
    if(e.keyCode == 40) {
        keyboard.down = true;
    }
    if(e.keyCode == 32) {
        keyboard.space = true;
    }
    if(e.keyCode == 68) {
        keyboard.d = true;
    }
});

window.addEventListener("keyup", (e) => {                       // Der EventListner "keyup" gibt den Variabeln der Tasten den Wert "flase" sobald eine Taste losgelassen wird
    if(e.keyCode == 39) {
        keyboard.right = false;
    }
    if(e.keyCode == 37) {
        keyboard.left = false;
    }
    if(e.keyCode == 38) {
        keyboard.up = false;
    }
    if(e.keyCode == 40) {
        keyboard.down = false;
    }
    if(e.keyCode == 32) {
        keyboard.space = false;
    }
    if(e.keyCode == 68) {
        keyboard.d = false;
    }
    if(e.keyCode == 27) {
        keyboard.esc = false;
    }
});

// nonfunctional !!!!
function fullscreen() {
    fullscreen = document.getElementById('fullscreen');
    if (!checkFullscreen || !keyboard.esc) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    checkFullscreen = true;
}

function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    checkFullscreen = false;
}
        


