function addGameLogs(socket, logger) {
    socket.on('choose a game', function () {
        logger.consume({ message: 'choose a game' });
    });

    socket.on('your game choice was rejected', function (gameName, gameNames) {
        logger.consume({
            message: 'your game choice was rejected (' + gameName + ')'
        });
    });

    socket.on('you chose game', function (name, words) {
        logger.consume({
            message: 'you chose game ' + name
        })
    });
}

module.exports = addGameLogs;