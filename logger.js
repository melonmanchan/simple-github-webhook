'use strict'

var chalk      = require('chalk');
var dateformat = require('dateformat');

var LOG_TYPES = {
    INFO  : chalk.green,
    WARN  : chalk.yellow,
    ALERT : chalk.red
}

function log(message, logType) {
    if (!logType) logType = LOG_TYPES.INFO;

    var now = Date();
    var timeStamp = dateformat(now, '[HH:MM:ss dd/mm/yyyy] ')
    console.log(timeStamp + logType(message));
}

module.exports = {
    LOG_TYPES,
    log
}

