var networkLogger = require('./shared_instances/network_logger');
var addNicknameActions = require('./listeners_actions/nickname');
var addNicknameLogs = require('./listeners_reports/nickname');
var addUsersLogs = require('./listeners_reports/users');
var addOwnClientLogs = require('./listeners_reports/own_client');

module.exports = function (socket) {
    // actions
    addNicknameActions(socket);

    // logs
    addNicknameLogs(socket, networkLogger);
    addUsersLogs(socket, networkLogger);
    addOwnClientLogs(socket, networkLogger);
};