var express = require('express');
var app = express();
var server = app.listen(process.env.PORT, process.env.IP);
var io = require('socket.io')(server);

app.use('/', express.static('public'));

var nicknames = {};

io.on('connection', function (socket) {
    socket.on('nickname was input', function (nickname) {
        if (nickname in nicknames) {
            socket.emit('nickname rejected', nickname);
        } else {
            nicknames[nickname] = null;
            socket.nickname = nickname;
            socket.broadcast.emit('user joined', nickname);
        }
    });
});

io.on('disconnect', function (socket) {
    if (socket.nickname) {
        delete nicknames[socket.nickname];
    }
});