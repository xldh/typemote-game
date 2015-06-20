var inputNickname = require('./input_nickname');

module.exports = function (socket) {
   console.log('init_socket_listeners');

   socket.on('nickname rejected', function (duplicateNickname) {
      inputNickname(socket, duplicateNickname);
   });

   socket.on('user joined', function (nickname) {
       alert(nickname + ' has connected');
   });
};