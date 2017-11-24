var Crawler = require("crawler"),
_ = require('lodash'),
cheerio = require('cheerio');

var startURL = 'http://localhost:8888',
pages = [{
        url: '/'
    }
];

var c = new Crawler({
        maxConnections: 1,
        // This will be called for each crawled page
        callback: function (error, res, done) {

            if (error) {

                console.log(error);

            } else {

                var $ = cheerio.load(res.body);

                $("a").each(function (i, el) {

                    // does it have an href?
                    if (el.attribs.href) {

                        // is it an internal link?
                        if (el.attribs.href[0] === '/') {

                            var pg = _.find(pages, function (pg) {

                                    var href = el.attribs.href;

                                    href = href.replace(/#.+$/, '');

                                    return pg.url === href;

                                });

                            if (!pg) {

                                pages.push({
                                    url: el.attribs.href
                                });

                                console.log(el.attribs.href);

                                c.queue(startURL + el.attribs.href);

                            }

                        }

                    }

                });

            }
            done();
        }
    });

c.on('drain', function () {

    console.log('we be done man');
    console.log();
    console.log(pages);

});

c.queue(startURL);
