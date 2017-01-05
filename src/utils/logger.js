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
    logger = bunyan.createLogger({
        name: 'runlogjs',

        stream: process.stdout,
        level: 'trace',
    });
};
