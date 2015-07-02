function addUsersLogs(socket, logger) {
   socket.on('user joined', function (nickname) {
      logger.consume({ message: 'user ' + nickname + ' joined' });
   });

   socket.on('user left', function (nickname) {
       logger.consume({ message: 'user ' + nickname + ' left' });
   });
}

module.exports = addUsersLogs;