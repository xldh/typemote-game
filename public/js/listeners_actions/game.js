var eventBus = require('../shared_instances/event_bus');

function addGameActions(socket) {
    socket.on('choose a game', function (gameNames) {
        promptGameChoice(socket, gameNames);
    });

    socket.on('your game choice was rejected', function (gameName, gameNames) {
        promptGameChoice(socket, gameNames);
    });

    socket.on('you chose game', function (name, words) {
        eventBus.emit('please init game ' + name, words);
    });
}

function promptGameChoice(socket, gameNames) {
    var gameNumber = prompt(gameNames.map(function (gameName, index) {
        return (index + 1) + ': ' + gameName;
    }).join('\n'));

    socket.emit('game chosen', gameNames[gameNumber - 1]);
}

module.exports = addGameActions;