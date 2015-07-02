var inputNickname = require('../input_nickname.js');

function addNicknameActions(socket) {
    socket.on('nickname was asked', function () {
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
       socket.nickname = nickname;
    });
}

module.exports = addNicknameActions;