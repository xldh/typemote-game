var shuffle = require('../shuffle');

function WordsGenerator(params) {
    params = params || {};
    var words = params.words || [];
    var wordCountPerGeneration = params.wordCountPerGeneration || words.length;

    this.words = words;
    this.wordCountPerGeneration = wordCountPerGeneration;
    this.lastGeneration = [];
}


WordsGenerator.prototype.generate = function () {
    var words = this.words.slice();
    shuffle(words);

    var generation = words.slice(0, this.wordCountPerGeneration);

    this.lastGeneration = generation;

    return generation;
};

module.exports = WordsGenerator;