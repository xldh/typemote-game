var assert = require('assert');
var WordsEngine = require('../typemote_engine/words_engine.js');

describe('WordsEngine', function () {
    describe('#bestMatchingWord()', function () {
        it ('should pick the best matching word', function () {
            var words = ['aefcd', 'dfcsq', 'abcde', 'qwert'];
            var word = 'adcbe';
            var expected = 'abcde';
            var wordsEngine = new WordsEngine({
                words: words
            });

            assert.equal(wordsEngine.bestMatchingWord(word), expected);
        });
    });
});