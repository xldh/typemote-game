// preload available games
var availableGames = require('./available_games');
var initSocket = require('./init_socket');
var socket = initSocket();

preloadAvailableGames();


function preloadAvailableGames() {
    availableGames.forEach(function (game) {
        require('./games/' + game + '/index');
    });
}


var $ = require('jquery');
var eventBus = require('./shared_instances/event_bus');
var TypemoteInputHandler = require('./typemote_input_handler');

var inputHandler = new TypemoteInputHandler();
registerKeyboardEvents();


function registerKeyboardEvents() {
    var $input = $('<input type="text">');
    $input.css({ opacity: 0 });

    $(document.body).append($input);
    $input.focus();

    $(document).click(function () {
        $input.focus();
    });

    $input.keypress(function (event) {

        if (event.which === 13) {
            eventBus.emit('end of word was typed');
            return;
        }

        setTimeout(function () {
            var char = $input.val();

            if (char) {
                eventBus.emit('char was typed', char);
                $input.val('');
            }
        }, 0);
    })
}