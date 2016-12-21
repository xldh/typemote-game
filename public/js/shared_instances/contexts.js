var gameCanvas = document.getElementById('game_canvas');
var uiCanvas = document.getElementById('ui_canvas');
var gameContext = gameCanvas.getContext('2d');
var uiContext = uiCanvas.getContext('2d');

var canvases = [
    gameCanvas,
    uiCanvas
];


function setup() {
    canvases.forEach(function (canvas) {
        canvas.width = 1900;
        canvas.height = 1080;
    });
}


module.exports = {
    gameContext: gameContext,
    uiContext: uiContext
};
