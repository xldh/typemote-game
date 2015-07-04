function matchWords(first, second) {
    if (first.length === 0) {
        throw new Error(matchWords.ERR_FIRST_NOT_LONG_ENOUGH);
    }

    if (first.length > second.length) {
        throw new Error(matchWords.ERR_FIRST_TOO_LONG);
    }

    var maxRatio = 1 / (second.length / first.length);
    var matchingCharCount = 0;
    var diffIndices = [];

    first.split('').map(function (char, index) {
        if (char === second.charAt(index)) {
            matchingCharCount++;
        } else {
            diffIndices.push(index);
        }
    });

    var ratio = matchingCharCount / second.length;

    return {
        maxRatio: maxRatio,
        ratio: ratio,
        ratioToMax: ratio / maxRatio,
        diffIndices: diffIndices
    };
}

matchWords.ERR_FIRST_NOT_LONG_ENOUGH = 'Illegal comparison -> first word length should be at least 1';
matchWords.ERR_FIRST_TOO_LONG = 'Illegal comparison -> the first word is longer than the second one';

module.exports = matchWords;