var Crawler = require("crawler"),
_ = require('lodash'),
fs = require('fs'),
cheerio = require('cheerio');

var startURL = 'http://localhost:8888',

pages = [{
        url: '/'
    }
];

var c = new Crawler({
        maxConnections: 1,
        jQuery: false,
        // This will be called for each crawled page
        callback: function (error, res, done) {

            if (error) {

                //console.log(error);

            } else {

                var $ = cheerio.load(res.body);

                console.log(res.options.uri);

                var pg = _.find(pages, function (pg) {

                        return res.options.uri === pg.uri;

                    });

                if (pg) {

                    pg.title = $('title').text();

                }

                // follow links
                $('a').each(function (i, el) {

                    // does it have an href?
                    if (el.attribs.href) {

                        // is it an internal link?
                        if (el.attribs.href[0] === '/') {

                            var pg = _.find(pages, function (pg) {

                                    var href = el.attribs.href;

                                    href = href.replace(/#.+$/, '');

                                    return pg.href === href;

                                });

                            if (!pg) {

                                // push a new record for it

                                pg = {
                                    href: el.attribs.href,
                                    uri: startURL + el.attribs.href
                                };

                                pages.push(pg);

                                //var url = startURL + el.attribs.href;
                                //console.log(url);
                                //console.log(el.attribs.href);

                                c.queue(pg.uri);

                            }

                        }

                    }

                });

            }
            done();
        }
    });

c.on('drain', function () {

    console.log(pages.length + ' pages crawled.');

    fs.writeFile('report.json', JSON.stringify(pages), 'utf-8', function () {

        console.log('json written');

    });

});

c.queue(startURL);
