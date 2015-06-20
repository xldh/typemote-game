var initSocketListeners = require('./init_socket_listeners');
var socket = null;

function initSocket() {
    if (!socket) {
        socket = io();
        initSocketListeners(socket);
    }

    return socket;
}

module.exports = initSocket;