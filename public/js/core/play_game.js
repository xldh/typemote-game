var eventBus = require('../shared_instances/event_bus');

eventBus.on('requiring to play game', playGame);

function playGame(name, words) {
    console.log('playGame', name, words);
    var Game = require('../games/' + name + '/index');
    var game = new Game(words);
    console.log('play game', game);
    game.run();
}