var inputNickname = require('./input_nickname');
var networkLogger = require('./network_logger');

module.exports = function (socket) {
   socket.on('nickname was asked', function () {
        networkLogger.consume({ message: 'nickname was asked' });
        if (socket.nickname) {
            socket.emit('nickname was input', socket.nickname);
        } else {
            inputNickname(socket);
        }
   });

   socket.on('nickname rejected', function (duplicateNickname) {
       networkLogger.consume({ message: 'nickname ' + duplicateNickname + ' was rejected'});
       delete socket.nickname;
       inputNickname(socket, duplicateNickname);
   });

   socket.on('nickname accepted', function (nickname) {
       console.log('nickname accepted', nickname);
       networkLogger.consume({ message: 'nickname ' + nickname + ' accepted' });
       socket.nickname = nickname;
   });

   socket.on('user joined', function (nickname) {
      networkLogger.consume({ message: 'user ' + nickname + ' joined' });
   });

   socket.on('disconnect', function () {
       networkLogger.consume({ message: 'client disconnected' });
   });
};