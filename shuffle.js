function shuffle(array, iterations) {
    iterations = iterations || 3;

    var iteration;
    var l = array.length;

    for (iteration = 0; iteration < iterations; iterations++) {
        for (var i = 0; i < l; i++) {
            var randomIndex = Math.random() * l | 0;
            var tmp = array[i];

            array[i] = array[randomIndex];
            array[randomIndex] = tmp;
        }
    }

    return array;
}

module.exports = shuffle;