var assert = require('assert');
var matchWords = require('../typemote_engine/match_words');

describe('matchWords(first, second)', function () {
    it('should match entirely', function () {
        var first = 'test';
        var second = 'test';
        var expected = {
            maxRatio: 1,
            ratio: 1,
            ratioToMax: 1,
            diffIndices: []
        };

        assert.deepEqual(matchWords(first, second), expected);
    });

    it('should match entirely according to maxRatio', function () {
        var first = 'tes';
        var second = 'test';
        var expected = {
            maxRatio: 0.75,
            ratio: 0.75,
            ratioToMax: 1,
            diffIndices: []
        };

        assert.deepEqual(matchWords(first, second), expected);
    });

    it('should have an accurate delta analysis', function () {
        var first = 'toss';
        var second = 'test';
        var expectedDiffIndices = [1, 3];

        assert.deepEqual(
            matchWords(first, second).diffIndices,
            expectedDiffIndices
        );
    });

    describe('Error handling', function () {
        it('should throw an error when first is longer than second', function () {
            var first = 'test';
            var second = 'tes';

            assert.throws(
                function () {
                    matchWords(first, second);
                },
                Error,
                matchWords.ERR_FIRST_TOO_LONG);
        });

        it('should throw an error when first has a length of 0', function () {
            var first = '';
            var second = 'test';

            assert.throws(
                function () {
                    matchWords(first, second);
                },
                Error,
                matchWords.ERR_FIRST_NOT_LONG_ENOUGH);
        });
    });

});