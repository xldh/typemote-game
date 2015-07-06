function addGameLogs(socket, logger) {
    socket.on('choose a game', function () {
        logger.consume({ message: 'choose a game' });
    });
}

module.exports = addGameLogs;