
const request = require('request-promise-native')
let ipAddress = process.argv.slice(2)

const baseUrl = 'http://api.ipstack.com/' + ipAddress
const queryString = '?access_key=34b0df547dcdba418be8c03d49c5a141'
let options = {
    uri: baseUrl + queryString,
    
}

request(options).then(function(reso :any ){            
    console.log(JSON.parse(reso))
})
