var eventBus = require('../shared_instances/event_bus');

function addGameStatesUpdate(socket) {
    socket.on('update', function (states) {
        eventBus.emit('states update', states);
    });
}


module.exports = addGameStatesUpdate;
