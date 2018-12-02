"use strict";
var ipAd = process.argv.slice(2);
var ping = require('ping');
var hosts = [ipAd];
ping.sys.probe(ipAd, function (isAlive) {
    console.log(isAlive);
});
//# sourceMappingURL=ping.js.map