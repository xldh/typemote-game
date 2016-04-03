var eventBus = require('./shared_instances/event_bus');
var rule =  /^[a-zA-Z0-9]$/;

function TypemoteInputHandler() {
    var word = '';

    eventBus.on('char was typed', function (char) {
        word += char;
    });

    eventBus.on('end of word was typed', function () {
        if (word) {
            eventBus.emit('wants to send word', word);
            word = '';
        }
    });
}

module.exports = TypemoteInputHandler;