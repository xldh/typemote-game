var simpleTemplate = require('./simple_template.js');

function LogHTMLDisplayer(params) {
    params = params || {};

    this.container = params.container || null;
    this.templateSelector = params.templateSelector || '';
}


LogHTMLDisplayer.prototype.display = function (entries) {
    if (!Array.isArray(entries)) {
        entries = [entries];
    }

    for (var i = 0, l = entries.length; i < l; i++) {
        var template = simpleTemplate(this.templateSelector);
        var messageHolder;

        if (template.hasAttribute('data-contents')) {
            messageHolder = template;
        } else {
            template = template.querySelector('[data-contents]');
        }

        messageHolder.textContent = entries[i].message;

        this.container.appendChild(template);
    }
};

module.exports = LogHTMLDisplayer;