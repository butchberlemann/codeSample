"use strict";
var request = require('request-promise-native');
var ipAddress = process.argv.slice(2);
var baseUrl = 'http://api.ipstack.com/' + ipAddress;
var queryString = '?access_key=34b0df547dcdba418be8c03d49c5a141';
var options = {
    uri: baseUrl + queryString,
};
request(options).then(function (reso) {
    console.log(JSON.parse(reso));
});
//# sourceMappingURL=geoIP.js.map