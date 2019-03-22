#!/usr/bin/env node
'use strict';

var config    = require('./config');
var logger    = require('./logger');
var LOG_TYPES = logger.LOG_TYPES;

var http          = require('http');
var ip            = require('ip');
var spawn = require('child_process').spawn;
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
    logger.log('Will run following command on authenticated request: ' + config.COMMAND);
});
var deploy = function (event) {
    if (event.payload.ref === config.BRANCH || event.payload.hook) {
        logger.log(`Running deployment script ${config.COMMAND} now...`)

        var cmd = spawn(config.COMMAND, [], {
            env: {
                REPOSITORY_NAME: event.payload.repository.name,
                REPOSITORY_CLONE: event.payload.repository.clone_url,
                REPOSITORY_CLONE_SSH: event.payload.repository.ssh_url
            }
        })

        cmd.stdout.on('data', (data) => {
            data.toString().split("\n").forEach((v) => {
                logger.log(v);
            });
        })

        cmd.stderr.on('data', (data) => {
            data.toString().split("\n").forEach((v) => {
                logger.log(v);
            });
        })

        cmd.on('close', (code) => {
            logger.log(`Deployment finished with code ${code}`);
        });
    }
}
handler.on('ping', deploy);
handler.on('push', deploy);

handler.on('error', function (error) {
    logger.log('Webhook error: ' + error, LOG_TYPES.ALERT);
});
