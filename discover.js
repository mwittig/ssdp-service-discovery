var ssdp = require('node-ssdp').Client
    , client = new ssdp({})
    , found = false

client.start()

client.on('notify', function () {
    //console.log('Got a notification.')
})

client.on('response', function inResponse(headers, code, rinfo) {
    found = true
    console.log('Got a response to an m-search:\n%d\n%s\n%s', code, JSON.stringify(headers, null, '  '), JSON.stringify(rinfo, null, '  '))
})

//client.search('urn:schemas-upnp-org:device:MediaRenderer:1')
client.search('urn:schemas-upnp-org:device:MediaRenderer:1')
setTimeout(function() {
    if (!found) {
        client.search('urn:schemas-upnp-org:device:MediaRenderer:1')
    }
}, 5000);

// Or maybe if you want to scour for everything after 5 seconds
//setTimeout(function() {
//    client.search('ssdp:all')
//}, 5000)

// And after 10 seconds, you want to stop
setTimeout(function () {
    client.stop()
}, 20000)
