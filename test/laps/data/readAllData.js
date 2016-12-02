'use strict';

const test = require('tape');
const u = require('../../../src/laps/data/readAllData.js');
const reqRes = require('../../helpers/ReqRes.js');

test('testReadll', function(t) {
    // let res;
    console.log(reqRes);
    t.equal(u.readAll(reqRes), 67);
    t.end();
});
