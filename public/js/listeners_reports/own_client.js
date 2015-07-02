function addOwnClientLogs(socket, logger) {
   socket.on('disconnect', function () {
       logger.consume({ message: 'client disconnected' });
   });
}

module.exports = addOwnClientLogs;