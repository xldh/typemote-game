function addNicknameLogs(socket, logger) {
    socket.on('nickname was asked', function () {
        logger.consume({ message: 'nickname was asked' });
    });

    socket.on('nickname rejected', function (duplicateNickname) {
       logger.consume({ message: 'nickname ' + duplicateNickname + ' was rejected'});
    });

    socket.on('nickname accepted', function (nickname) {
       logger.consume({ message: 'nickname ' + nickname + ' accepted' });
    });
}

module.exports = addNicknameLogs;