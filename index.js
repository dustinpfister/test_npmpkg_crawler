var Hapi = require('hapi');

var server = new Hapi.Server(),

// open shift?
openShift = {
    appName: 'CRAWL_TEST1_NAME'
};
openShift.port = process.env['NODEJS_' + openShift.appName + '_SERVICE_PORT'];
openShift.host = process.env['NODEJS_' + openShift.appName + '_HOST'];

server.connection({
    port: 8080,
    host: 172.30.231.52 //openShift.host || 'localhost'
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

    /*
    server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
    reply('Hello, world!');
    }
    });
     */

    server.start(function (e) {

        if (e) {

            console.log(e);

        } else {

            console.log('hapi server up:');
            console.log('port: ' + server.info.port);
            console.log('uri: ' + server.info.uri);
            console.log('');
            console.log('OPENSHIFT_APP_NAME: ' + process.env['OPENSHIFT_APP_NAME']);
            console.log('process.env:');
            console.log(process.env);

        }

    });

});
