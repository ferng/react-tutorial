var test = require("tape");
var underTest = require("../../../src/laps/data/testTest.js");

test("testTests", function(t) {
    t.equal(1, 1, "are equal");

    t.equal(underTest.myTest(), 67);
    t.end();
})