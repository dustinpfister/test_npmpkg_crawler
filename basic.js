// basic crawler useage

var Crawler = require('crawler');

// create a new crawler
var c = new Crawler({

        maxConnections: 1,
        jQuery: false,

        // This will be called for each crawled page
        callback: function (err, res, done) {

            if (err) {

                console.log(err);

            } else {

                // the body of the page
                console.log(res.body);

            }

            done();
        }

    });

// query a single url
c.queue('http://www.google.com');