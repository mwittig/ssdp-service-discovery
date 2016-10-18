var ssdp = require('node-ssdp').Client
    , client = new ssdp({})
    , found = false
    , rest = require('restler-promise')(Promise);

client.start();

client.on('response', function inResponse(headers, code, rinfo) {
    found = true;
    if (headers.LOCATION !== undefined) {
        rest.get(headers.LOCATION, {
            parser: rest.restler.parsers.xml
        }).then(function(result) {
            if (result.data.root.device[0].manufacturer[0].toUpperCase().indexOf('YAMAHA') >= 0) {
                console.log(
                    "Found", result.data.root.device[0].manufacturer[0],
                    result.data.root.device[0].modelName[0],
                    "address", rinfo.address
                );
            }

        })
    }
});

client.search('urn:schemas-upnp-org:device:MediaRenderer:1')
setTimeout(function() {
    if (!found) {
        client.search('urn:schemas-upnp-org:device:MediaRenderer:1')
    }
}, 5000);


// And after 10 seconds, you want to stop
setTimeout(function () {
    client.stop()
}, 10000);
