#!/usr/bin/env node
'use strict';

var config = require('./config');

var http          = require('http');
var ip            = require('ip');
var exec          = require('child_process').exec;
var createHandler = require('github-webhook-handler');

var handler = createHandler({
    secret : config.SECRET,
    path   : config.HOOK_PATH
});

http.createServer(function (req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404;
        res.end('error')
    });
}).listen(config.PORT, function () {
    console.log('GitHub webhook running at: http://' + ip.address() + ':' + config.PORT + config.HOOK_PATH);
    console.log('Listening for commits to branch ' + config.BRANCH);
});

handler.on('push', function (event) {
    if (event.payload.ref === config.BRANCH) {
        console.log(new Date(), ' : Running deployment now...');
        exec('sh deploy.sh', function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log('Deployment finished!');
        });
    }
});

handler.on('error', function (error) {
    console.error('Webhook error: ' + error);
});

