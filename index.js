var stream = require('stream');
var express = require('express');
var csv = require('csv');
var math = require('mathjs');

// Webserver
var app = express();
var server = app.listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
app.get('/socket-io.js', function(req, res) {
    res.sendfile('./node_modules/socket.io-client/dist/socket.io.js');
});

// CHANGE THAT TO MATCH YOUR INPUT FORMAT
var csvStream = csv();
csvStream.from.options({ columns: ['r', 'g', 'b', 't'] })
csvStream.transform(function(row) {
    row.r = parseFloat(row.r);
    row.g = parseFloat(row.g);
    row.b = parseFloat(row.b);
    row.t = parseFloat(row.t);
    io.sockets.emit('message', row);
    return null;
});

var inputStream;
if (process.env.NODE_ENV != 'test') {
    inputStream = process.stdin;
} else { // fake data
    inputStream = require('./fake');
    setInterval(inputStream.generateData.bind(inputStream), 1000);
}

inputStream.pipe(csvStream);