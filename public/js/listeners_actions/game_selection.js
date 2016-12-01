var eventBus = require('../shared_instances/event_bus');
var playGame = require('../core/play_game');

function addGameActions(socket) {
    socket.on('choose a game', function (games) {
        if (socket.gameName) {
            socket.emit('game chosen', socket.gameName);
        } else {
            promptGameChoice(socket, games);
        }
    });

    socket.on('your game choice was rejected', function (gameName, gameNames) {
        promptGameChoice(socket, gameNames);
    });

    socket.on('you chose game', function (name, words, gameData) {
        setSocketGameName(socket, name);
        eventBus.emit('please init game ' + name, words, gameData);
        eventBus.emit('requiring to play game', name, words, gameData);
    });
}

function promptGameChoice(socket, games) {
    var gameNumber = prompt(games.map(function (game, index) {
        console.log('gameName', game.name);
        return game.name + ' (' + (index + 1) + ')';
    }).join('\n'));

    socket.emit('game chosen', games[gameNumber - 1].id);
}

function setSocketGameName(socket, gameName) {
    socket.gameName = gameName;
}

module.exports = addGameActions;