let canvas;
let world;
let keyboard = new Keyboard();
let gameStart = false;
let gameRunTime = 0;

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
bottle_breaks_sound = new Audio('audio/broken_bottle.mp3');
collect_coin_sound = new Audio('audio/collect_coin.mp3');
collect_bottle_sound = new Audio('audio/collect_bottle.mp3');
chicken_kill_sound = new Audio('audio/chicken_kill.mp3');


// GameOverSounds
you_lost = new Audio('audio/game_over.mp3');
you_lost.loop = false;
you_won = new Audio('audio/win_game.mp3');
you_won.loop = false;

/**
 * The function "startGame ()" calls all necessary functions to start our game.
 */
function startGame() {
    this.gameRunTime = new Date().getTime();
    hideStartScreen();
    hideEndScreenWon();
    hideEndScreenLoose();
    initGame();
    bindBtsPressEvents ();
    this.gameMusic.play(); 
    initLevel();
    canvas = document.getElementById('canvas');                 // An die Variabel "canvas" wird das HTML Elemet 'canvas' gebunden.
    world = new World(canvas, keyboard);                        // An die Variabel "world" wird das neue Objekt namens 'World' gebunden, dieser geben wir 'canvas' & 'keyboard' als Variabel mit.
    gameStart = true;
}
/**
 * The function "initGame()" removes the "display none" attribute from our ingame settings menu.
 */
function initGame() {
    document.getElementById("settingsBtn").classList.remove("d-none");
}
/**
 * The function "hideStartScreen()" sets elements to "display none" which should not be visible after starting the game.
 */
function hideStartScreen() {
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
}
/**
 * The function "showStartScreen()" sets elements to "display none" which should not be visible and and sets elements to be visiable before starting the game.
 */
function showStartScreen() {
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("gameControl").style.display= "flex";
    document.getElementById("gameOverWon").style.display= "none";
    document.getElementById("gameOverLoose").style.display= "none";
    document.getElementById("gameControlBottom").style.display= "none";
    document.getElementById("hud").classList.add("d-none");
}
/**
 * The function "showEndScreenLoose()" pauses all inGame sounds and plays the you_lost sound after loosing a game. It also sets elements to "display none" which should not be visible after the game is over.
 */
function showEndScreenLoose() {
    pauseAllSounds();
    document.getElementById("gameOverLoose").classList.remove("d-none");
    document.getElementById("settingsBtn").classList.add("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
    document.getElementById("hud").classList.add("d-none");
}
/**
 * The function "hideEndScreenLoose()" pauses all inGame sounds aswell pauses the you_lost sound after loosing a game. It also sets elements to "display none" which should not be visible after the game is over and the endscreen is going to get hide.
 */
function hideEndScreenLoose() {
    pauseAllSounds();
    document.getElementById("gameOverLoose").classList.add("d-none");
    document.getElementById("settingsBtn").classList.remove("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
    document.getElementById("hud").classList.remove("d-none");
}
/**
 * The function "showEndScreenWon()" pauses all inGame sounds aswell pauses the you_won sound after winning a game. It also sets elements to "display none" which should not be visible after the game is over.
 */
function showEndScreenWon() {
    pauseAllSounds();
    document.getElementById("gameOverWon").classList.remove("d-none");
    document.getElementById("settingsBtn").classList.add("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
    document.getElementById("hud").classList.add("d-none");
}
/**
 * The function "hideEndScreenWon()" pauses all inGame sounds aswell pauses the you_won sound after winning a game. It also sets elements to "display none" which should not be visible after the game is over.
 */
function hideEndScreenWon() {
    pauseAllSounds();
    document.getElementById("gameOverWon").classList.add("d-none");
    document.getElementById("settingsBtn").classList.remove("d-none");
    document.getElementById("startScreen").style.display= "none";
    document.getElementById("gameControl").style.display= "none";
    document.getElementById("hud").classList.remove("d-none");
}
/**
 * The function "showGameSettings()". It sets elements to be visable when showing the game settings.
 */
function showGameSettings() {
    document.getElementById("gameSettings").classList.remove("d-none");
    document.getElementById("hud").classList.add("d-none");
}
/**
 * The function "hideGameSettings ()". It sets elements to be invisable when closing the game settings.
 */
function hideGameSettings() {
    document.getElementById("gameSettings").classList.add("d-none");
    document.getElementById("hud").classList.remove("d-none");
}
/**
 * The funcion "toggleVisibility(id)" lets us change the visibility of elements from invisible to visible.
 * @param {*} id - is the ID of the element which visibility should get switched between visiable and invisible.
 */
function toggleVisibility(id) {
    let element = document.getElementById(id);
    if (element.classList.contains("d-none")) {
        element.classList.remove("d-none");
    } else {
        element.classList.add("d-none");
    }
}
/**
 * The function "checkAspectRatio()" checks the aspect ratio of page width to page height. As soon as the page width is less than the page height, the user will be prompted to rotate their mobile device.
 */
function checkAspectRatio() {
    const container = document.getElementById('rotateDevice');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = windowWidth / windowHeight;

    if (aspectRatio < 1) {
        container.style.display = 'block';
        document.getElementById("hud").classList.add("d-none");
        document.getElementById("gameControl").style.display= "none";
    } else {
        container.style.display = 'none';
        if (gameStart == false){
            document.getElementById("gameControl").style.display= "flex";
            document.getElementById("hud").classList.remove("d-none");
            
        } else {
            document.getElementById("gameControl").style.display= "none";
            document.getElementById("hud").classList.remove("d-none");
        }
    }
}
/**
 * The event listener checks for window size changes and then calls the checkAspectRatio function.
 */
window.addEventListener('resize', checkAspectRatio);

function setFxVolume(volumeLevel) {
    walking_sound.volume = volumeLevel;
    jumping_sound.volume = volumeLevel;
    hurt_sound.volume = volumeLevel;
    dead_sound.volume = volumeLevel;
    throw_bottle_sound.volume = volumeLevel;
    throw_bottle_sound.volume = volumeLevel;
    collect_coin_sound.volume = volumeLevel;
    collect_bottle_sound.volume = volumeLevel;
    chicken_kill_sound.volume = volumeLevel;
}

    document.addEventListener("DOMContentLoaded", function() {

        function setVolume(volumeLevel) {
            if (gameMusic) {
                gameMusic.volume = volumeLevel;
            }
        }
    
        let slider = document.getElementById("mySoundVol");
        slider.addEventListener("input", function() {
            let volume = parseFloat(slider.value) / 100;
            setVolume(volume);
        });
    
        let soundCheckbox = document.getElementById("Sound");
        soundCheckbox.addEventListener("change", function() {
            if (soundCheckbox.checked) {
                setVolume(0); // Stummschalten der Musik
            } else {
                let volume = parseFloat(slider.value) / 100;
                setVolume(volume); // Lautstärke wiederherstellen
            }
        });
    
        let fxSlider = document.getElementById("myFxVol");
        let fxCheckbox = document.getElementById("fxSound");
    
        fxSlider.addEventListener("input", function() {
            let fxVolume = parseFloat(fxSlider.value) / 100;
            setFxVolume(fxVolume);
        });
    
        fxCheckbox.addEventListener("change", function() {
            if (fxCheckbox.checked) {
                setFxVolume(0); // Stummschalten der Soundeffekte
            } else {
                let fxVolume = parseFloat(fxSlider.value) / 100;
                setFxVolume(fxVolume); // Lautstärke der Soundeffekte wiederherstellen
            }
        });
    
});
/**
 * The function "pauseAllSounds()" pauses all sounds.
 */
function pauseAllSounds() {
    gameMusic.pause();
    walking_sound.pause();
    jumping_sound.pause();
    hurt_sound.pause();
    dead_sound.pause();
    throw_bottle_sound.pause();
}
// Fullscreen Function
document.addEventListener("DOMContentLoaded", () => {
    const canvasFullScreen = document.getElementById("canvas");
    const wrapper = document.getElementById("fullScreen");
    const fullScreenBtn = document.getElementById("fullScreenBtn");
    const originalCanvasWidth = canvasFullScreen.width;
    const originalCanvasHeight = canvasFullScreen.height;
    let isFullscreen = false;
/**
 * The function "toggleFullscreen()" toggles between fullscreen and non fullscreen mode and calls the "resizeCanvas()" function to change size of our canvas.
 */
    function toggleFullscreen() {
        if (!isFullscreen) {
            wrapper.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    isFullscreen = !isFullscreen;
    resizeCanvas();
    }
/**
 * The function "resizeCanvas()" calculate a resize factor based on our browser width & height to keep our aspectratio when resizing our canvas.
 */
    function resizeCanvas() {
        const scaleFactorX = wrapper.clientWidth / originalCanvasWidth;
        const scaleFactorY = wrapper.clientHeight / originalCanvasHeight;
        const scaleFactor = Math.min(scaleFactorX, scaleFactorY);
        canvasFullScreen.style.transform = isFullscreen ? `scale(${scaleFactor})` : "scale(1)";
    }

    document.addEventListener("keydown", event => {
        if (event.key === "F11") {
            event.preventDefault();
            toggleFullscreen();
        } 
    });

    window.addEventListener("resize", () => {
        resizeCanvas();
    });

    fullScreenBtn.addEventListener("click", () => {
        toggleFullscreen();
    });
    resizeCanvas();
    });
/**
 * The function "bindBtsPressEvents ()" binds our mobile button to our keyboard input.
 */
function bindBtsPressEvents () {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    });

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.space = false;
    });

    document.getElementById('btnD').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.d = true;
    });

    document.getElementById('btnD').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.d = false;
    });

    document.getElementById('btnB').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.b = true;
    });

    document.getElementById('btnB').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.b = false;
    });
    
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





