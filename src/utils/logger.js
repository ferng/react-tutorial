const bunyan = require('bunyan');

let logger;
let init;

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

    streams: [
        {
            path: 'runlog.log',
            level: 'trace',
        },
        {
            stream: process.stdout,
            level: 'trace',
        },
    ],
});
};
