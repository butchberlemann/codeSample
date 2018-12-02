"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var fullResponse = { geo: null,
    dns: null,
    ping: null };
var ip = { address: '',
    geo: '0',
    revDNS: '0',
    ping: '0'
};
app.get('/api/ip', function (req, res) {
    ip = Object.assign(ip, req.query);
    if (isValidIPorDomain(ip.address)) {
        var exec = require('child_process').exec;
        if (ip.geo === '0') {
            exec('node ./services/geoIP.ts ' + ip.address, function (error, stdout, stderr) {
                fullResponse.geo = stdout;
                if (error !== null) {
                    fullResponse.geo = error.message;
                }
                if (allResponses()) {
                    var response = Object.assign({}, fullResponse);
                    cleanfullResponse();
                    res.json(response);
                }
            });
        }
        if (ip.revDNS === '0') {
            exec('node ./services/reverseDNS.ts ' + ip.address, function (error, stdout, stderr) {
                fullResponse.dns = stdout;
                if (error !== null) {
                    fullResponse.dns = error.message;
                }
                if (allResponses()) {
                    var response = Object.assign({}, fullResponse);
                    cleanfullResponse();
                    res.json(response);
                }
            });
        }
        if (ip.ping === '0') {
            exec('node ./services/ping.ts ' + ip.address, function (error, stdout, stderr) {
                fullResponse.ping = stdout;
                if (error !== null) {
                    fullResponse.ping = error.message;
                }
                if (allResponses()) {
                    var response = Object.assign({}, fullResponse);
                    cleanfullResponse();
                    res.json(response);
                }
            });
        }
    }
    else {
        res.json({ result: null });
    }
});
function allResponses() {
    var responseVal = true;
    if (ip.geo === '0' && fullResponse.geo === null) {
        responseVal = false;
    }
    if (ip.revDNS === '0' && fullResponse.dns === null) {
        responseVal = false;
    }
    if (ip.ping === '0' && fullResponse.ping === null) {
        responseVal = false;
    }
    return (responseVal);
}
function cleanfullResponse() {
    fullResponse.geo = null;
    fullResponse.dns = null;
    fullResponse.ping = null;
    ip.address = '';
    ip.geo = '0';
    ip.revDNS = '0';
    ip.ping = '0';
}
function isValidIPorDomain(providedValue) {
    var regexpIP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    var domain = require('domain-regex');
    var isValidIPorDomain;
    isValidIPorDomain = false;
    if ((domain().test(providedValue)) || (regexpIP.test(providedValue))) {
        isValidIPorDomain = true;
    }
    return isValidIPorDomain;
}
app.listen('3002', function () { return console.log('Server listening on port 3002'); });
//# sourceMappingURL=index.js.map