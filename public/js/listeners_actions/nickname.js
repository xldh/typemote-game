var inputNickname = require('../input_nickname.js');

function addNicknameActions(socket) {
    socket.on('nickname was asked', function () {
        socket.nickname = localStorage.getItem('nickname');
        if (socket.nickname) {
            socket.emit('nickname was input', socket.nickname);
        } else {
            inputNickname(socket);
        }
    });

    socket.on('nickname rejected', function (duplicateNickname) {
       delete socket.nickname;
       window.localStorage.removeItem('nickname');
       inputNickname(socket, duplicateNickname);
    });

    socket.on('nickname accepted', function (nickname) {
       socket.nickname = nickname;
       window.localStorage.setItem('nickname', nickname);
    });
}

module.exports = addNicknameActions;