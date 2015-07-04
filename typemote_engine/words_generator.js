var shuffle = require('../shuffle');

function WordsGenerator(params) {
    params = params || {};
    var words = params.words || [];
    var wordCountPerGeneration = params.wordCountPerGeneration || words.length;

    this.words = words;
    this.wordCountPerGeneration = wordCountPerGeneration;
}


WordsGenerator.prototype.generate = function () {
    var words = this.words.slice();
    shuffle(words);

    return words.slice(0, this.wordCountPerGeneration);
};

module.exports = WordsGenerator;