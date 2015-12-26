#!/usr/bin/env node
'use strict';

var config = require('./config');

var http          = require('http');
var exec          = require('child_process').exec;
var createHandler = require('github-webhook-handler');

var handler = createHandler({
    secret: config.SECRET,
    path:   config.PATH
});

http.createServer(function (req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404;
        res.end('error')
    });
}).listen(config.PORT);

handler.on('push', function (event) {
    if (event.payload.ref === config.BRANCH) {
        exec('sh deploy.sh', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }
});

handler.on('error', function (error) {
    console.error('Webhook error: ' + error);
});

