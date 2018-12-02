let ipAd = process.argv.slice(2)
let ping = require('ping')
 
let hosts = [ipAd]

ping.sys.probe(ipAd, function(isAlive :any  ){
    console.log(isAlive)
})
