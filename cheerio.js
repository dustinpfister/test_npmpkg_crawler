// basic crawler useage

var Crawler = require('crawler'),
cheerio = require('cheerio');

// create a new crawler
var c = new Crawler({

        maxConnections: 1,
        jQuery: false,

        // This will be called for each crawled page
        callback: function (err, res, done) {

            var $,
            self = this;

            if (err) {

                console.log(err);

            } else {

                $ = cheerio.load(res.body);

                // all the anchors in the page
                //console.log($('a'));
                $('a').each(function (i, a) {

                    var href = a.attribs.href;

                    if (href) {

                        console.log(res.request.host + ' > ' + href);

                        // follow it
                        c.queue(href);

                    }

                });

            }

            done();
        }

    });

// query a single url
c.queue('http://www.google.com');
