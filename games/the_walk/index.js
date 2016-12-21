var WordsEngine = require('../../typemote_engine/words_engine.js');
var words = require('./words');
var actions = require('./actions');

function initGame(socket) {
    var states = {
        left: false,
        right: false,
        up: false,
        down: false,
        position: {
            x: 0.5,
            y: 0.5
        }
    };

    return {
        words: words,
        update: function update(states) {
            if (states.left) {
                states.position.x -= 0.001;
            } else if (states.right) {
                states.position.x += 0.001;
            }

            if (states.up) {
                states.position.y -= 0.001;
            } else if (states.down) {
                states.position.y += 0.001;
            }

            socket.emit('states update', states);
        },
        actions: actions,
        states: states
    };
}

module.exports = {
    name: 'The walk',
    init: initGame
};
