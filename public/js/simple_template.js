function simpleTemplate(templateSelector) {
    var element = document.querySelector(templateSelector);

    if (!element) {
        throw new Error('Unknown template id');
    }

    var template = element.innerHTML.trim();
    var fakeContainer = document.createElement('div');

    fakeContainer.innerHTML = template;

    var templateDOM = fakeContainer.childNodes;
    var templateDOMLength = templateDOM.length;

    if (templateDOMLength > 1) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < templateDOMLength; i++) {
            fragment.appendChild(templateDOM[i]);
        }

        templateDOM = fragment;
    } else {
        templateDOM = templateDOM[0];
    }

    return templateDOM;
}

module.exports = simpleTemplate;