var eventBus = require('../shared_instances/event_bus');

function addGameUpdates(socket) {
    socket.on('states update', function (states) {
        eventBus.emit('states update', states);
    });

    socket.on('words update', function (actionsWords) {
        eventBus.emit('words update', actionsWords);
    });
}


module.exports = addGameUpdates;
