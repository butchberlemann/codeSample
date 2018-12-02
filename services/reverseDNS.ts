
let request1 = require('request-promise-native')
let ipAddress1 = process.argv.slice(2)

const baseUrl1 = 'https://api.hackertarget.com/reversedns/'
const queryString1 = '?q='+ ipAddress1

let options1 = {
    uri: baseUrl1 + queryString1,
    
};

request1(options1).then(function(reso :any ){            
    console.log(reso)
})
