var express = require('express');
var app = express();
var server = app.listen(process.env.PORT, process.env.IP);
var io = require('socket.io')(server);
var fs = require('fs');
var eventBus = require('./shared_instances/event_bus');

app.use('/', express.static('public'));

var nicknames = {};

// FIXME
// This mess needs to be cleaned up, serious file separation needed around here
addServerLocalListeners();

io.on('connection', function (socket) {
    console.log('connection');

    socket.on('nickname was input', function (nickname) {
        tryToRememberSocketNickname(socket, nickname);
    });

    socket.on('game chosen', function (gameName) {
        console.log('game chosen', gameName);
        tryToSelectGame(socket, gameName);
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
        eventBus.emit('nickname accepted', socket, nickname);
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


function tryToSelectGame(socket, gameName) {
    var availableGames = getAvailableGames();
    var gameIndex = availableGames.indexOf(gameName);

    if (gameIndex !== -1) {
        socket.emit('you chose game', gameName, getGameWords(gameName));
    } else {
        socket.emit('your game choice was rejected', gameName, availableGames);
    }
}


function addServerLocalListeners() {
    eventBus.on('nickname accepted', function (socket, nickname) {
        var availableGames = getAvailableGames();

        console.log('nickname accepted', nickname);
        console.log('asking client to choose a game');

        socket.emit('nickname accepted', nickname);
        socket.emit('choose a game', availableGames);
    });
}


function getAvailableGames() {
    var games = fs.readdirSync('./games');

    return games;
}

function getGameWords(gameName) {
    var gameWords = require('./games/' + gameName + '/words');

    return gameWords;
}