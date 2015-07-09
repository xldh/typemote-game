var eventBus = require('../../shared_instances/event_bus');

eventBus.on('please init game the_walk', function (words) {
    console.log('"The walk" game init was asked politely', words);
});

module.exports = true;