try {
    var http = require('http');
    var express = require('express');
    var config = require('./config');
    var logger = require('./utils/logger');
    var app = express();

    var server = http.createServer(app).listen('8003', function () {
        console.log('started server on port 8003');
    });
} catch (error) {
    console.log(error);
}