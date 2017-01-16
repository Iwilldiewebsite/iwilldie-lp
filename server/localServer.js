'use strict';

var bodyParser = require('../packages/node_modules/body-parser');
var cors = require('../packages/node_modules/cors');
var express = require('../packages/node_modules/express');
var server = express();

var port = 4141;

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use('/', express.static('../src/'));
server.use('/', express.static('../'));

server.listen(port, function () {
    console.log('local server listening on port ' + port);
});