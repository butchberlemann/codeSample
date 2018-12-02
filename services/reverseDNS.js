"use strict";
var request1 = require('request-promise-native');
var ipAddress1 = process.argv.slice(2);
var baseUrl1 = 'https://api.hackertarget.com/reversedns/';
var queryString1 = '?q=' + ipAddress1;
var options1 = {
    uri: baseUrl1 + queryString1,
};
request1(options1).then(function (reso) {
    console.log(reso);
});
//# sourceMappingURL=reverseDNS.js.map