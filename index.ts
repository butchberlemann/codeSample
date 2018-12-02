import  * as express from 'express'

const app : express.Express = express()
let fullResponse = {geo : null,
                    dns : null,
                    ping : null}

let ip = { address : '',
           geo : '0',
           revDNS : '0',
           ping : '0'
         }

app.get('/api/ip',  (req : express.Request, res : express.Response) => {

    ip = Object.assign(ip, req.query)
    
    if(isValidIPorDomain(ip.address)){

        let exec = require('child_process').exec

        if(ip.geo ===  '0'){
            exec('node ./services/geoIP.ts ' + ip.address, function(error :any, stdout :any, stderr :any) {
                
                fullResponse.geo = stdout

                if (error !== null) {
                    fullResponse.geo = error.message
                }

                if(allResponses()){
                    let response = Object.assign({}, fullResponse)
                    cleanfullResponse()
                    res.json(response)
                }
            
            })
        }

        if(ip.revDNS ===  '0'){
            exec('node ./services/reverseDNS.ts ' + ip.address, function(error :any, stdout :any, stderr :any) {
                fullResponse.dns = stdout

                if (error !== null) {
                    fullResponse.dns = error.message
                }

                if(allResponses()){
                    let response = Object.assign({}, fullResponse)
                    cleanfullResponse()
                    res.json(response)
                }

            })
        }

        if(ip.ping ===  '0'){
            exec('node ./services/ping.ts ' + ip.address, function(error :any, stdout :any, stderr :any) {
                fullResponse.ping = stdout

                if (error !== null) {
                    fullResponse.ping = error.message
                }

                if(allResponses()){
                    let response = Object.assign({}, fullResponse)
                    cleanfullResponse()
                    res.json(response)
                }
         
            })
        }

    }else{
        res.json({ result : null })
    }
});

function allResponses() : boolean{
    let responseVal = true 
    if(ip.geo === '0' && fullResponse.geo === null){
        responseVal = false
    }

    if(ip.revDNS === '0' && fullResponse.dns === null){
        responseVal = false
    }

    if(ip.ping === '0' && fullResponse.ping === null){
        responseVal = false
    }
    return(responseVal)
}

function cleanfullResponse() : void { 
    fullResponse.geo = null
    fullResponse.dns = null
    fullResponse.ping = null
    
    ip.address = ''
    ip.geo = '0'
    ip.revDNS = '0'
    ip.ping = '0' 
    
}

function isValidIPorDomain(providedValue : string) : boolean {
    let regexpIP : RegExp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    let domain = require('domain-regex')

    let isValidIPorDomain: boolean
    isValidIPorDomain = false

    if ((domain().test(providedValue)) || (regexpIP.test(providedValue))){
        isValidIPorDomain = true    
    }

    return isValidIPorDomain
}

app.listen('3002',() => console.log('Server listening on port 3002'))