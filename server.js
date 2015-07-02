var express = require('express');
var app = express();
var server = app.listen(process.env.PORT, process.env.IP);
var io = require('socket.io')(server);

app.use('/', express.static('public'));

var nicknames = {};

io.on('connection', function (socket) {
    console.log('connection');

    socket.on('nickname was input', function (nickname) {
        tryToRememberSocketNickname(socket, nickname);
    });

    socket.on('disconnect', function () {
        console.log('client disconnected');
        socket.broadcast.emit('user left', socket.nickname || 'anonymous');
        if (socket.nickname) {
            delete nicknames[socket.nickname];
        }
    });

    makeSocketAwareOfOthers(socket);
    socket.emit('nickname was asked');
});

function validateNickname(nickname) {
    var passed = true;

    if (!nickname || nickname in nicknames) {
        passed = false;
    }

    return passed;
}


function tryToRememberSocketNickname(socket, nickname) {
    if (validateNickname(nickname)) {
        rememberSocketNickname(socket, nickname);
        socket.emit('nickname accepted', nickname);
        socket.broadcast.emit('user joined', nickname);
    } else {
        console.log('nickname', nickname, 'was rejected');
        socket.emit('nickname rejected', nickname);
    }
}


function rememberSocketNickname(socket, nickname) {
    nicknames[nickname] = null;
    socket.nickname = nickname;
    console.log(nickname, 'registered');
}


function makeSocketAwareOfOthers(socket) {
    for (var nickname in nicknames) {
        socket.emit('user joined', nickname);
    }
}