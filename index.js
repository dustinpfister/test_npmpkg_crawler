


var Hapi = require('hapi');

var server = new Hapi.Server();

console.log(process.env);

server.connection({
    port: process.env.PORT ||5000,
    host: process.env.HOST || 'localhost'
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

        }

    });

});
