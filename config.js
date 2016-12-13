'use strict';

module.exports = {
    COMMAND   : process.env.COMMAND                 || './deploy.sh',
    SECRET    : process.env.SECRET                  || undefined,
    HOOK_PATH : process.env.HOOK_PATH               || '/',
    PORT      : process.env.PORT                    || 8080,
    BRANCH    : 'refs/heads/' + (process.env.BRANCH || 'master')
};

