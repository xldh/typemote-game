// preload available games
var availableGames = require('./available_games');
var initSocket = require('./init_socket');
var socket = initSocket();

preloadAvailableGames();

function preloadAvailableGames() {
    availableGames.forEach(function (game) {
        require('./games/' + game + '/index');
    });
}