var matchWords = require('./match_words');
var WordsGenerator = require('./words_generator');

function WordsEngine(params) {
    params = params || {};

    var wordPool = params.words || [];
    var poolSize = params.poolSize || wordPool.length;

    this.wordsGenerator = new WordsGenerator({
        words: wordPool,
        wordCountPerGeneration: poolSize
    });

    this.words = this.wordsGenerator.generate();
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

WordsEngine.prototype.nextWordGenereration = function () {
    this.words = this.wordGenerator.generate();
};

module.exports = WordsEngine;