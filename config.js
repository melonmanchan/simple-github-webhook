'use strict';

module.exports = {
    SECRET: process.env.SECRET  || '',
    PATH:   process.env.PATH    || '/',
    PORT:   process.env.PORT    || 8080,
    BRANCH: 'refs/heads/' + (process.env.BRANCH || 'master')
};

