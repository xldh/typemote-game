var eventBus = require('../shared_instances/event_bus');

eventBus.on('requiring to play game', playGame);

// @TODO decouple game mechanics and effects mechanics as they are different
function playGame(name, words, gameData) {
    console.log('playGame', name, words);
    var Game = require('../games/' + name + '/index');
    var game = new Game(words, gameData);
    console.log('play game', game);
    game.run();

    eventBus.on('states update', function (states) {
        game.states = states;
    });

    eventBus.on('char was typed', function (char) {
        console.log('renderCharTyped', char);
        game.renderCharTyped(char);
    });

    eventBus.on('words update', function (actionsWords) {
        console.log('words update', actionsWords);
        game.actionsWords = actionsWords;
        game.uiNeedsRedraw = true;
    });
}
