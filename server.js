var express = require('express');
var React = require('react');
var requirejs = require('requirejs');

requirejs.config({nodeRequire: require});

var httpServer = express();
httpServer.listen(4000);
httpServer.use('/static', express.static('static'));

/////////// END OF BORING STUFF //////////////

httpServer.get('/', function (request, response) {
    response.send("<script>document.location = 'static/index.html';</script>");
});
