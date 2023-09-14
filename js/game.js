let canvas;
let world;
let keyboard = new Keyboard();
let gameStart = false;
let gameRunTime = 0;
let soundSettingsActive = false;
let isFullscreen = false;
let wrapper;
let originalCanvasWidth; 
let originalCanvasHeight; 
let canvasFullScreen;

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
you_lost_sound = new Audio('audio/game_over.mp3');
you_lost_sound.loop = false;
you_won_sound = new Audio('audio/win_game.mp3');
you_won_sound.loop = false;

/**
 * The function "startGame ()" calls all necessary functions to start our game.
 */
function startGame() {
    let fullScreenActive = localStorage.getItem("fullScreenActive");
    this.gameRunTime = new Date().getTime();
    hideStartScreen();
    hideEndScreenWon();
    hideEndScreenLoose();
    initGame();
    bindBtsPressEvents ();
    this.gameMusic.play(); 
    initLevel();
    canvas = document.getElementById('canvas');                 
    world = new World(canvas, keyboard);                       
    gameStart = true;
    localStorage.setItem("fullScreenActive", fullScreenActive);
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
    soundSettingsActive = true;
    document.getElementById("gameSettings").classList.remove("d-none");
    document.getElementById("hud").classList.add("d-none");
}

/**
 * The function "hideGameSettings ()". It sets elements to be invisable when closing the game settings.
 */
function hideGameSettings() {
    soundSettingsActive = false;
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
        document.getElementById("hud").classList.add("d-none");
    } else {
        element.classList.add("d-none");
        document.getElementById("hud").classList.remove("d-none");
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

/**
 * The function "setFxVolume(volumeLevel)" assigns the volume Level to all FX Sounds
 * @param {Number} volumeLevel 
 */
function setFxVolume(volumeLevel) {
    walking_sound.volume = volumeLevel;
    jumping_sound.volume = volumeLevel;
    hurt_sound.volume = volumeLevel;
    dead_sound.volume = volumeLevel;
    throw_bottle_sound.volume = volumeLevel;
    collect_coin_sound.volume = volumeLevel;
    collect_bottle_sound.volume = volumeLevel;
    chicken_kill_sound.volume = volumeLevel;
    you_lost_sound.volume = volumeLevel;
    you_won_sound.volume = volumeLevel;
    bottle_breaks_sound.volume = volumeLevel;
}

/**
 * The function "setVolume(volumeLevel)" assigns the volume Level to the Game Music
 * @param {Number} volumeLevel 
 */
function setVolume(volumeLevel) {
    if (gameMusic) {
        gameMusic.volume = volumeLevel;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let slider = document.getElementById("mySoundVol");
    let soundCheckbox = document.getElementById("Sound");
    let fxSlider = document.getElementById("myFxVol");
    let fxCheckbox = document.getElementById("fxSound");

/**
 * The function "saveVolumeSettings(volumeLevel, isMuted, fxVolumeLevel, isFxMuted)" saves volume level and checkbox status into the local storage.
 * @param {Number} volumeLevel - Number between 0 & 100 depending on choosen volume level.
 * @param {Boolean} isMuted - boolean Value if checkbox is checked or not, returns ture or false.
 * @param {Number} fxVolumeLevel - Number between 0 & 100 depending on choosen volume level.
 * @param {Boolean} isFxMuted - boolean Value if checkbox is checked or not, returns ture or false.
 */
    function saveVolumeSettings(volumeLevel, isMuted, fxVolumeLevel, isFxMuted) {
        localStorage.setItem('volumeLevel', volumeLevel);
        localStorage.setItem('isMuted', isMuted);
        localStorage.setItem('fxVolumeLevel', fxVolumeLevel);
        localStorage.setItem('isFxMuted', isFxMuted);
    }

/**
 * The function "loadVolumeSettings()" restores volume level and checkbox status out of the local storage.
 */  
    function loadVolumeSettings() {
        const volumeLevel = parseFloat(localStorage.getItem('volumeLevel')) || 1.0;             
        const isMuted = localStorage.getItem('isMuted') === 'true';                             
        const fxVolumeLevel = parseFloat(localStorage.getItem('fxVolumeLevel')) || 1.0;         
        const isFxMuted = localStorage.getItem('isFxMuted') === 'true';                         

        setVolume(isMuted ? 0 : volumeLevel);                                                   
        soundCheckbox.checked = isMuted;

        setFxVolume(isFxMuted ? 0 : fxVolumeLevel);                                             
        fxCheckbox.checked = isFxMuted;

        slider.value = isMuted ? 0 : volumeLevel * 100;
        fxSlider.value = isFxMuted ? 0 : fxVolumeLevel * 100;
    }

    loadVolumeSettings();

/**
 *  The slide event Listener saves the Volume level and / or if the mute checkbox status has changed.
 */                                                                                                
    slider.addEventListener("input", function() {
        let volume = parseFloat(slider.value) / 100;
        setVolume(volume);
        if (volume > 0) {
            soundCheckbox.checked = false;
        } else if (volume == 0) {
            soundCheckbox.checked = true;
        }
        saveVolumeSettings(volume, soundCheckbox.checked, parseFloat(fxSlider.value) / 100, fxCheckbox.checked);
    });

/**
 *  The soundCheckbox event Listener monitores the status of the mute checkboxes and adjustes the slider position accordingly.
 */   
    soundCheckbox.addEventListener("change", function() {
        let isMuted = soundCheckbox.checked;
        if (isMuted) {
            slider.value = 0;                                                                   
        } if (!isMuted) {
            slider.value = 100;                                                                 
        }
        setVolume(isMuted ? 0 : parseFloat(slider.value) / 100);
        saveVolumeSettings(parseFloat(slider.value) / 100, isMuted, parseFloat(fxSlider.value) / 100, fxCheckbox.checked);
    });

/**
 *  The fxSlide eventListener saves the Volume level and / or if the mute checkbox status has changed.
 */ 
    fxSlider.addEventListener("input", function() {
        let fxVolume = parseFloat(fxSlider.value) / 100;
        setFxVolume(fxVolume);
        if (fxVolume > 0) {
            fxCheckbox.checked = false;
        } else if (fxVolume == 0) {
            fxCheckbox.checked = true;
        }
        saveVolumeSettings(parseFloat(slider.value) / 100, soundCheckbox.checked, fxVolume, fxCheckbox.checked);
    });

/**
 *  The fxCheckbox event Listener monitores the status of the mute checkboxes and adjustes the slider position accordingly.
 */
    fxCheckbox.addEventListener("change", function() {
        let isFxMuted = fxCheckbox.checked;
        if (isFxMuted) {
            fxSlider.value = 0; 
        } if (!isFxMuted) {
            fxSlider.value = 100; 
        }
        setFxVolume(isFxMuted ? 0 : parseFloat(fxSlider.value) / 100);
        saveVolumeSettings(parseFloat(slider.value) / 100, soundCheckbox.checked, parseFloat(fxSlider.value) / 100, isFxMuted);
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
    let canvasFullScreen = document.getElementById("canvas");
    let wrapper = document.getElementById("fullScreen");
    let fullScreenBtn = document.getElementById("fullScreenBtn");
    let originalCanvasWidth = canvasFullScreen.width;
    let originalCanvasHeight = canvasFullScreen.height;
    let isFullscreen = false;

    // Hier wird der Vollbildstatus aus dem Local Storage gelesen
    let fullScreenActive = localStorage.getItem("fullScreenActive");
    if (fullScreenActive === "true") {
        toggleFullscreen();
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
    
        localStorage.setItem("fullScreenActive", isFullscreen ? "true" : "false");
    }
    
    function resizeCanvas() {
        let scaleFactorX = wrapper.clientWidth / originalCanvasWidth;
        let scaleFactorY = wrapper.clientHeight / originalCanvasHeight;
        let scaleFactor = Math.min(scaleFactorX, scaleFactorY);
        canvasFullScreen.style.transform = isFullscreen ? `scale(${scaleFactor})` : "scale(1)";
    }
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
}


window.addEventListener("keydown", (e) => {                      
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

window.addEventListener("keyup", (e) => {                       
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
});





