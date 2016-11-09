var test = require("tape");
var u = require("../../../src/laps/data/readAllData.js");
var reqRes = require("../../helpers/ReqRes.js");

test("testReadll", function(t) {
    var res;
    console.log(reqRes);
    t.equal(u.readAll(reqRes), 67);
    t.end();
});