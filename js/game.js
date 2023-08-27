let canvas;
let world;
let keyboard = new Keyboard();
let gameStart = false;

// GameMusic
gameMusic = new Audio('audio/retro_background_music.mp3');
gameMusic.loop = true;
gameMusic.autoplay = true;

// GameFX
walking_sound = new Audio('audio/walk.mp3');
jumping_sound = new Audio('audio/jump.mp3');
hurt_sound = new Audio('audio/hurt.mp3');
dead_sound = new Audio('audio/dead.mp3');
throw_bottle_sound = new Audio('audio/throw.mp3');
collect_coin_sound = new Audio('audio/collect_coin.mp3');
collect_bottle_sound = new Audio('audio/collect_bottle.mp3');

// GameOverSounds
you_lost = new Audio('audio/game_over.mp3');
you_lost.loop = false;
you_won = new Audio('audio/win_game.mp3');
you_won.loop = false;


function startGame () {
    hideStartScreen();
    hideEndScreenWon();
    hideEndScreenLoose();
    initGame();
    this.gameMusic.play(); 
    initLevel();
    canvas = document.getElementById('canvas');                 // An die Variabel "canvas" wird das HTML Elemet 'canvas' gebunden.
    world = new World(canvas, keyboard);                        // An die Variabel "world" wird das neue Objekt namens 'World' gebunden, dieser geben wir 'canvas' & 'keyboard' als Variabel mit.
    gameStart = true;
}

function initGame() {
    document.getElementById("muteBtn").classList.remove("d-none");
}
function hideStartScreen() {
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
}

function showStartScreen() {
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("gameControl").style.display= "flex";
    document.getElementById("gameOverWon").style.display= "none";
    document.getElementById("gameOverLoose").style.display= "none";
    document.getElementById("gameControlBottom").style.display= "none";
}
function showEndScreenLoose() {
    pauseAllSounds();
    you_lost.play(); 
    document.getElementById("gameOverLoose").classList.remove("d-none");
    document.getElementById("muteBtn").classList.add("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
}
function hideEndScreenLoose() {
    pauseAllSounds();
    you_lost.pause(); 
    document.getElementById("gameOverLoose").classList.add("d-none");
    document.getElementById("muteBtn").classList.remove("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
}
function showEndScreenWon() {
    pauseAllSounds();
    you_won.play(); 
    document.getElementById("gameOverWon").classList.remove("d-none");
    document.getElementById("muteBtn").classList.add("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
}
function hideEndScreenWon() {
    pauseAllSounds();
    you_won.pause(); 
    document.getElementById("gameOverWon").classList.add("d-none");
    document.getElementById("muteBtn").classList.remove("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
}
function toggleVisibility(id) {
    let element = document.getElementById(id);
    if (element.classList.contains("d-none")) {
        element.classList.remove("d-none");
    } else {
        element.classList.add("d-none");
    }
}

function checkAspectRatio() {
    const container = document.getElementById('rotateDevice');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = windowWidth / windowHeight;

    if (aspectRatio < 1) {
        container.style.display = 'block';
        document.getElementById("gameControl").style.display= "none";
    } else {
        container.style.display = 'none';
        if (gameStart == false){
            document.getElementById("gameControl").style.display= "flex";
        } else {
            document.getElementById("gameControl").style.display= "none";
        }
    }
}

// Event-Listener für Änderungen der Fenstergröße
window.addEventListener('resize', checkAspectRatio);

function setFxVolume(volumeLevel) {
    walking_sound.volume = volumeLevel;
    jumping_sound.volume = volumeLevel;
    hurt_sound.volume = volumeLevel;
    dead_sound.volume = volumeLevel;
    throw_bottle_sound.volume = volumeLevel;
    collect_coin_sound.volume = volumeLevel;
    collect_bottle_sound.volume = volumeLevel;
}

    document.addEventListener("DOMContentLoaded", function() {

        function setVolume(volumeLevel) {
            if (gameMusic) {
                gameMusic.volume = volumeLevel;
            }
        }
    
        var slider = document.getElementById("mySoundVol");
        slider.addEventListener("input", function() {
            var volume = parseFloat(slider.value) / 100;
            setVolume(volume);
        });
    
        var soundCheckbox = document.getElementById("Sound");
        soundCheckbox.addEventListener("change", function() {
            if (soundCheckbox.checked) {
                setVolume(0); // Stummschalten der Musik
            } else {
                var volume = parseFloat(slider.value) / 100;
                setVolume(volume); // Lautstärke wiederherstellen
            }
        });
    
        var fxSlider = document.getElementById("myFxVol");
        var fxCheckbox = document.getElementById("fxSound");
    
        fxSlider.addEventListener("input", function() {
            var fxVolume = parseFloat(fxSlider.value) / 100;
            setFxVolume(fxVolume);
        });
    
        fxCheckbox.addEventListener("change", function() {
            if (fxCheckbox.checked) {
                setFxVolume(0); // Stummschalten der Soundeffekte
            } else {
                var fxVolume = parseFloat(fxSlider.value) / 100;
                setFxVolume(fxVolume); // Lautstärke der Soundeffekte wiederherstellen
            }
        });
    
});

function pauseAllSounds() {
    gameMusic.pause();
    walking_sound.pause();
    jumping_sound.pause();
    hurt_sound.pause();
    dead_sound.pause();
    throw_bottle_sound.pause();
    // Füge hier weitere Sound-Variablen hinzu, falls du mehr FX-Sounds hast
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
    if(e.keyCode == 66) {
        keyboard.b = true;
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
    if(e.keyCode == 66) {
        keyboard.b = false;
    }
    if(e.keyCode == 68) {
        keyboard.d = false;
    }
});




