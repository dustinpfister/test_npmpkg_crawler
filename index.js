var Hapi = require('hapi');

var server = new Hapi.Server();

// does not work
// 'nodejs-crawl-test1-name-13-26rlm'

// log env here before it fails
console.log('process.env:');
console.log(process.env);

server.connection({
    port: 8080,
    host: '172.30.231.52' //openShift.host || 'localhost'
});

server.register(require('inert'), function (e) {

    if (e) {

        console.log(e);

    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    });

    server.start(function (e) {

        if (e) {

            console.log(e);

        } else {

            console.log('hapi server up:');
            console.log('port: ' + server.info.port);
            console.log('uri: ' + server.info.uri);
            console.log('');
            console.log('OPENSHIFT_APP_NAME: ' + process.env['OPENSHIFT_APP_NAME']);
            console.log('HOSTNAME: ' + process.env['HOSTNAME']);
            console.log('process.env:');
            console.log(process.env);

        }

    });

});
