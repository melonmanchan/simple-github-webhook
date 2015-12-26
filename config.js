'use strict';

module.exports = {
    SECRET:      process.env.SECRET                  || '',
    HOOK_PATH:   process.env.HOOK_PATH               || '/',
    PORT:        process.env.PORT                    || 8080,
    BRANCH:      'refs/heads/' + (process.env.BRANCH || 'master')
};

