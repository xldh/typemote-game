var eventBus = require('../../shared_instances/event_bus');
var contexts = require('../../shared_instances/contexts');
var Drawer = require('../../Drawer');
var gameContext = contexts.gameContext;
var uiContext = contexts.uiContext;

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

    this.gameDrawer = new Drawer(gameContext);
    this.uiDrawer = new Drawer(uiContext);
    this.actionsWords = actionsWords;
    this.states = states;

    this.uiNeedsRedraw = true;

    Game.instance = this;
}


Game.instance = null;

Game.prototype.run = function () {
    var game = this;

    window.requestAnimationFrame(function () {
        game.update();
        game.renderGame();

        if (game.uiNeedsRedraw) {
            console.log('redrawing ui');
            game.renderActions();
            game.uiNeedsRedraw = false;
        }

        game.run();
    });
};


Game.prototype.renderGame = function () {
    var params = {
        x: this.hero.x,
        y: this.hero.y,
        width: this.hero.width,
        height: this.hero.height,
        color: 'rgba(255, 0, 0, 0.01)',
    };

    this.gameDrawer.drawRect(params);
};


Game.prototype.findWordForAction = function (actionName) {
    return this.actionsWords[actionName] || null;
};


Game.prototype.renderActions = function () {
    this.uiDrawer.clear();
    this.uiDrawer.drawText({
        text: this.findWordForAction('left'),
        x: 0.1,
        y: 0.5
    });
    this.uiDrawer.drawText({
        text: this.findWordForAction('up'),
        x: 0.5,
        y: 0.1
    });
    this.uiDrawer.drawText({
        text: this.findWordForAction('right'),
        x: 0.9,
        y: 0.5
    });
    this.uiDrawer.drawText({
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
