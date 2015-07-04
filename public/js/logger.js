var LogHTMLDisplayer = require('./log_html_displayer.js');

function Logger(displayer) {
    this.buffer = [];
    this.displayer = displayer || new LogHTMLDisplayer({
        container: document.body,
        templateSelector: '#logger'
    });
}


Logger.prototype.push = function (entry) {
    this.buffer.push(entry);
};


Logger.prototype.flush = function () {
    this.displayer.display(this.buffer);
    this.buffer.length = 0;
};


Logger.prototype.consume = function (entry) {
    this.displayer.display(entry);
};


module.exports = Logger;