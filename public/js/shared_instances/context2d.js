var canvas = document.getElementById('game_canvas');
var context2d = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

function provideContext() {
    return context2d;
}

module.exports = context2d;