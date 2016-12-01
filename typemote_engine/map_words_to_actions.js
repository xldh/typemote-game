function mapWordsToActions(words, actions) {
    console.log('map words to actions', words);

    function mapWordToAction(accumulator, actionName, index) {
        accumulator = accumulator || {};
        accumulator[actionName] = words[index];

        return accumulator;
    }

    var actionNames = Object.keys(actions);

    return actionNames.reduce(mapWordToAction, {});
}

module.exports = mapWordsToActions;
