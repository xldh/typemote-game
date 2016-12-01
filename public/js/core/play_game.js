var eventBus = require('../shared_instances/event_bus');

eventBus.on('requiring to play game', playGame);

function playGame(name, words, gameData) {
    console.log('playGame', name, words);
    var Game = require('../games/' + name + '/index');
    var game = new Game(words, gameData);
    console.log('play game', game);
    game.run();

    eventBus.on('states update', function (states) {
        game.states = states;
    });
}