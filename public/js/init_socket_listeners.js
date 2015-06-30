var inputNickname = require('./input_nickname');

module.exports = function (socket) {
   console.log('init_socket_listeners');

   socket.on('nickname was asked', function () {
      console.log('nickname was asked');
      if (socket.nickname) {
         socket.emit('nickname was input', socket.nickname);
      } else {
         inputNickname(socket);
      }
   });

   socket.on('nickname rejected', function (duplicateNickname) {
      delete socket.nickname;
      inputNickname(socket, duplicateNickname);
   });

   socket.on('nickname accepted', function (nickname) {
      console.log('nickname accepted');
      socket.nickname = nickname;
   });

   socket.on('user joined', function (nickname) {
      console.log('user', nickname, 'joined');
       alert(nickname + ' has connected');
   });

   socket.on('disconnect', function () {
      console.log('client disconnected');
   });
};