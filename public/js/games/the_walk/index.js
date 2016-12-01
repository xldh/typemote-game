var eventBus = require('../../shared_instances/event_bus');
var context2d = require('../../shared_instances/context2d');
var Drawer = require('../../Drawer');

eventBus.on('please init game the_walk', function (actionsWords) {
    console.log('"The walk" game init was asked politely', actionsWords);
});

function Game(actionsWords, states) {
    console.log('actionsWords', actionsWords);
    console.log(states);
    if (Game.instance) {
        return Game.instance;
    }

    this.hero = {
        width: 0.01,
        height: 0.01,
        x: states.position.x,
        y: states.position.y
    };

    this.drawer = new Drawer(context2d);
    this.actionsWords = actionsWords;
    this.states = states;

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
    this.renderActions();
};


Game.prototype.findWordForAction = function (actionName) {
    return this.actionsWords[actionName] || null;
};


Game.prototype.renderActions = function () {
    this.drawer.drawText({
        text: this.findWordForAction('left'),
        x: 0.1,
        y: 0.5
    });
    this.drawer.drawText({
        text: this.findWordForAction('up'),
        x: 0.5,
        y: 0.1
    });
    this.drawer.drawText({
        text: this.findWordForAction('right'),
        x: 0.9,
        y: 0.5
    });
    this.drawer.drawText({
        text: this.findWordForAction('down'),
        x: 0.5,
        y: 0.9
    });
};


Game.prototype.update = function (states) {
    this.hero.x = this.states.position.x;
    this.hero.y = this.states.position.y;
};


module.exports = Game;