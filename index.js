var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
    port: 8080
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

        }

    });

});
