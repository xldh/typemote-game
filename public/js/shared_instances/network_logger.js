var Logger = require('../logger.js');
var LogHTMLDisplayer = require('../log_html_displayer');
var displayer = new LogHTMLDisplayer({
    container: document.getElementById('network_logger'),
    templateSelector: '#logger_inner_contents'
});

module.exports = new Logger(displayer);