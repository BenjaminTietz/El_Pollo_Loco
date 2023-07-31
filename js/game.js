let canvas;
let world;


function init () {
    canvas = document.getElementById('canvas');     // An die Variabel "canvas" wird das HTML Elemet 'canvas' gebunden.
    world = new World(canvas);                      // An die Variabel "world" wird das neue Objekt namens 'World' gebunden, dieser geben wir 'canvas' als Variabel mit.

    console.log('My Character is',world.character);
}