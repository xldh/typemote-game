var matchWords = require('./match_words');
var WordsGenerator = require('./words_generator');
var mapWordsToActions = require('./map_words_to_actions');

function WordsEngine(params) {
    params = params || {};

    var wordPool = params.words || [];
    var poolSize = params.poolSize || wordPool.length;
    var actions = params.actions || {};

    this.wordsGenerator = new WordsGenerator({
        words: wordPool,
        wordCountPerGeneration: poolSize
    });

    var words = this.wordsGenerator.generate();

    this.mappedWordsActions = mapWordsToActions(words, actions);
    this.words = words;
    this.actions = actions;
}

/**
 * Picks the best matching word for a given word
 * @param {String} word
 * @return {String} this.words[?]
 */
WordsEngine.prototype.bestMatchingWord = function (word) {
    var matches = this.words.map(function (wordToCompareTo) {
        return {
            word: wordToCompareTo,
            match: matchWords(word, wordToCompareTo)
        };
    // filter words with first char equal
    }).filter(function (result) {
        return result.match.diffIndices[0] !== 0;
    // sort by diffIndices length ascending
    }).sort(function (resultA, resultB) {
        return resultA.match.diffIndices.length -
               resultB.match.diffIndices.length;
    // remap to words array only
    }).map(function (result) {
        return result.word;
    });

    return matches[0];
};


WordsEngine.prototype.findActionFromWord = function (word) {
    for (var actionName in this.mappedWordsActions) {
        console.log(actionName, this.mappedWordsActions[actionName]);

        if (word === this.mappedWordsActions[actionName]) {
            return this.actions[actionName];
        }
    }

    return null;
};

WordsEngine.prototype.nextWordGenereration = function () {
    this.words = this.wordGenerator.generate();
};

module.exports = WordsEngine;