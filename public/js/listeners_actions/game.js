function addGameActions(socket) {
    socket.on('choose a game', function (games) {
        console.log(games);
    });
}

module.exports = addGameActions;