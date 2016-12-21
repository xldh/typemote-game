var gameCanvas = document.getElementById('game_canvas');
var uiCanvas = document.getElementById('ui_canvas');
var effectsCanvas = document.getElementById('effects_canvas');
var gameContext = gameCanvas.getContext('2d');
var uiContext = uiCanvas.getContext('2d');
var effectsContext = effectsCanvas.getContext('2d');

var canvases = [
    gameCanvas,
    uiCanvas,
    effectsCanvas
];

setup();


function setup() {
    canvases.forEach(function (canvas) {
        canvas.width = 600;
        canvas.height = 400;
    });
}


module.exports = {
    gameContext: gameContext,
    uiContext: uiContext,
    effectsContext: effectsContext
};
