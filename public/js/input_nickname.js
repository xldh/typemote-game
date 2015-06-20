module.exports = function (socket, duplicateNickname) {
    var message = 'Enter a nickname';

    if (duplicateNickname) {
        message += ' (' + duplicateNickname + ' is already taken)';
    }

    var nickname = prompt(message);
    socket.emit('nickname was input', nickname);
};