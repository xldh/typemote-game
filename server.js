var express = require('express');
var app = express();
var server = app.listen(process.env.PORT, process.env.IP);
var io = require('socket.io')(server);
var fs = require('fs');
var eventBus = require('./shared_instances/event_bus');

var WordsEngine = require('./typemote_engine/words_engine');

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
    var gameIndex = availableGames.map(function (game) {
        return game.id;
    }).indexOf(gameName);

    if (gameIndex !== -1) {
        var newGameInstance = getGameData(gameName).init(socket);

        runGame(socket, newGameInstance);

        newGameInstance.wordsEngine = new WordsEngine({
            words: getGameWords(gameName),
            actions: getGameActions(gameName)
        });

        socket.emit('you chose game', gameName, newGameInstance.wordsEngine.mappedWordsActions, newGameInstance.states);
    } else {
        socket.emit('your game choice was rejected', gameName, availableGames);
    }
}


function runGame(socket, game) {


    socket.on('word was input', function (word) {
        console.log('client sent word', word);

        var bestMatchingWord = game.wordsEngine.bestMatchingWord(word);
        var action = game.wordsEngine.findActionFromWord(word);

        if (action) {
            console.log('Action found!', game.states);
            action(game.states);
        }
    });

    function update () {
        game.update(game.states);
        setTimeout(function () {
            setImmediate(update);
        }, 100);
    }

    update();
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
    var dirs = fs.readdirSync('./games');

    return dirs.map(function (dir) {
        return {
            id: dir,
            name: require('./games/' + dir).name
        };
    });
}

function getGameData(gameName) {
    var gameData = require('./games/' + gameName + '/index');

    return gameData;
}

function getGameWords(gameName) {
    var gameWords = require('./games/' + gameName + '/words');

    return gameWords;
}

function getGameActions(gameName) {
    var gameActions = require('./games/' + gameName + '/actions');

    return gameActions;
}