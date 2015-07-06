var networkLogger = require('./shared_instances/network_logger');
var addNicknameActions = require('./listeners_actions/nickname');
var addGameActions = require('./listeners_actions/game');
var addNicknameLogs = require('./listeners_reports/nickname');
var addUsersLogs = require('./listeners_reports/users');
var addOwnClientLogs = require('./listeners_reports/own_client');
var addGameLogs = require('./listeners_reports/game');

module.exports = function (socket) {
    // actions
    addNicknameActions(socket);
    addGameActions(socket);

    // logs
    addNicknameLogs(socket, networkLogger);
    addGameLogs(socket, networkLogger);
    addUsersLogs(socket, networkLogger);
    addOwnClientLogs(socket, networkLogger);
};