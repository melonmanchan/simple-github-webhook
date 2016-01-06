#!/usr/bin/env node
'use strict';

var config    = require('./config');
var logger    = require('./logger');
var LOG_TYPES = logger.LOG_TYPES;

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
    logger.log('GitHub webhook running at: http://' + ip.address() + ':' + config.PORT + config.HOOK_PATH);
    logger.log('Listening for commits to branch ' + config.BRANCH);
});

handler.on('push', function (event) {
    if (event.payload.ref === config.BRANCH) {
        logger.log('Running deployment script now...')
        exec('sh deploy.sh', function(error, stdout, stderr) {
            logger.log('stdout: ' + stdout);
            logger.log('stderr: ' + stderr, LOG_TYPES.ALERT);
            if (error !== null) {
                logger.log('exec error: ' + error, LOG_TYPES.ALERT);
            }
            logger.log('Deployment finished!');
        });
    }
});

handler.on('error', function (error) {
    logger.log('Webhook error: ' + error, LOG_TYPES.ALERT);
});

