var WordsEngine = require('../typemote_engine/words_engine.js');
var words = require('./words');
var render = require('./render');
var update = require('./update');
var actions = require('./actions');

function initGame() {
    return {
        words: words,
        actions: actions,
        update: update,
        render: render,
        states: {
            left: false,
            right: false,
            up: false,
            down: false,
            position: {
                x: 0,
                y: 0
            }
        }
    };
}

module.exports = {
    name: 'the_walk',
    init: initGame
};