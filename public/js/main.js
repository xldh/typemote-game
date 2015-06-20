var initSocket = require('./init_socket');
var inputNickname = require('./input_nickname.js');
var socket = initSocket();

inputNickname(socket);