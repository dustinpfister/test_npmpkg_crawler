


var Hapi = require('hapi'),

crawl = require('./crawl.js'),

server = new Hapi.Server();

console.log(process.env);

server.connection({
    port: process.env.PORT || 5000
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

    server.route({
        method: 'POST',
        path: '/',
        handler: function (requset, reply) {

            console.log();

            var url = requset.payload;

            if (url) {

                crawl.crawl(url);
                reply('url processed');

            } else {

                reply('no url');

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
