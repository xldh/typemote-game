var assert = require('assert');
var WordsGenerator = require('../typemote_engine/words_generator');

describe('WordsGenerator', function() {
    describe('constructor()', function () {
        it('should ensure params are correctly defaulted', function () {
            var wordGenerator = new WordsGenerator();

            assert.deepEqual(wordGenerator.words, []);
            assert.equal(wordGenerator.wordCountPerGeneration, 0);
        });

        it('should ensure limit is well defaulted when words are given', function () {
            var wordGenerator = new WordsGenerator();

            assert.deepEqual(wordGenerator.words, []);
            assert.equal(wordGenerator.wordCountPerGeneration, 0);
        });

    });

    describe('#generate()', function () {
        var words;
        var wordGeneratorWithoutLimit;

        beforeEach(function () {
            words = ['a', 'b', 'c', 'd', 'e', 'f'];
            wordGeneratorWithoutLimit = new WordsGenerator({
                words: words
            });
        });

        it('should return an array of word list size', function () {
            assert.equal(
                wordGeneratorWithoutLimit.generate().length,
                words.length
            );
        });

        it('should return an array of specified limit size', function () {
            var expectedLength = 4;
            var wordGenerator = new WordsGenerator({
                words: words,
                wordCountPerGeneration: expectedLength
            });

            assert.equal(wordGenerator.generate().length, expectedLength);
        });
    });
});