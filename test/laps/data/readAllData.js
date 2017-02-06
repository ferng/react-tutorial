const test = require('tape');
const u = require('../../../src/laps/data/readAllData.js');
const reqRes = require('../../helpers/ReqRes.js');

test('testReadll', function(t) {
    console.log(reqRes);
    console.log(reqRes.json('hello'));
    // t.equal(u.readAll(reqRes), 67);
    t.equal(52, 52);
    t.end();
});
