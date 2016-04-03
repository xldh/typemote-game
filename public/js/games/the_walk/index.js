var eventBus = require('../../shared_instances/event_bus');
var render = require('./render');

eventBus.on('please init game the_walk', function (words) {
    console.log('"The walk" game init was asked politely', words);
});

function Game(words) {
    if (Game.instance) {
        return Game.instance;
    }

    this.hero = {
        x: 0,
        y: 0
    };

    Game.instance = this;
}

Game.instance = null;

Game.prototype.run = function () {
    var game = this;

    window.requestAnimationFrame(function () {
        game.update();
    });
};

Game.prototype.update = function () {
    var game = Game.instance;
    window.requestAnimationFrame(game.update);
};

module.exports = Game;