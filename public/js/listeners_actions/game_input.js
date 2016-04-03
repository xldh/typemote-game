var eventBus = require('../shared_instances/event_bus');

function addGameInputActions(socket) {
    eventBus.on('wants to send word', function (word) {
        sendWord(word);
    });

    function sendWord(word) {
        console.log('sending word', word);
        socket.emit('word was input', word);
    }
}


module.exports = addGameInputActions;