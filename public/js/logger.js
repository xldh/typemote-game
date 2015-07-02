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

function LogHTMLDisplayer(params) {
    params = params || {};

    this.container = params.container || null;
    this.templateSelector = params.templateSelector || '';
}


LogHTMLDisplayer.prototype.display = function (entries) {
    if (!Array.isArray(entries)) {
        entries = [entries];
    }

    var templateHolder = document.body.querySelector(this.templateSelector);

    for (var i = 0, l = entries.length; i < l; i++) {
        templateHolder = templateHolder.cloneNode(true);

        this.container.insertAdjacentHTML('beforeend', templateHolder.innerHTML);

        var messageHolders = this.container.querySelectorAll('[data-contents]');
        var messageHolder = messageHolders[messageHolders.length - 1];

        messageHolder.textContent = entries[i].message;

    }
};

module.exports = Logger;