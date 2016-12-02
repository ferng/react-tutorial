'use strict';

const bunyan = require('bunyan');

module.exports = {
    logger: undefined,

    getLogger: function() {
        if (typeof logger == 'undefined') {
            init();
        }
        return logger;
    },
};

init = function() {
    console.log('here');
    logger = bunyan.createLogger({
        name: 'runlogjs',

        stream: process.stdout,
        level: 'info',
    });
};
