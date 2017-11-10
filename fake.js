var stream = require('stream');

function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var inputStream = new stream.PassThrough();

inputStream.generateData = function() {
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    var t = new Date().getTime();
    this.write(r + ',' + g + ',' + b + ',' + t + '\n');
}

module.exports = inputStream;