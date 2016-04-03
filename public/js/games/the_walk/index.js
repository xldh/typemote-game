var eventBus = require('../../shared_instances/event_bus');
var context2d = require('../../shared_instances/context2d');
var Drawer = require('../../Drawer');

eventBus.on('please init game the_walk', function (words) {
    console.log('"The walk" game init was asked politely', words);
});

function Game(words) {
    if (Game.instance) {
        return Game.instance;
    }

    this.hero = {
        width: 0.1,
        height: 0.1,
        x: 0,
        y: 0
    };

    this.hero.x = 0.1;
    this.hero.y = 0.1;
    this.drawer = new Drawer(context2d);


    Game.instance = this;
}


Game.instance = null;

Game.prototype.run = function () {
    var game = this;

    window.requestAnimationFrame(function () {
        game.update();
        game.render();
        game.run();
    });
};


Game.prototype.render = function () {
    this.drawer.clear();
    this.drawer.drawRect(this.hero);
};


Game.prototype.update = function () {
    this.hero.x += 0.0001;
};


module.exports = Game;