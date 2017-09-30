var request = require('request');
var cheerio = require('cheerio');
const util = require('./../util/util.js');

function getYears(data) {
    data.splice(0, 1);
    return data.map(entry => 2000 + parseInt(entry.replace('Mar', '').trim()));
}

module.exports = function(url) {
    return new Promise((resolve, reject) => {
        request(url, function(error, response, html) {
            if (!error) {
                const $ = cheerio.load(html);
                var records = {};
                $('table:nth-child(4) tr').each(function(i, tr) {
                    var children = $(this).children();
                    var data = [];
                    children.each(function(j, td) {
                        data.push($(td).text());
                    });
                    if (i === 0) {
                        records.years = getYears(data);
                    }
                    if (i !== 0 && data.length > 0 && data[0].trim().length > 0) {
                        var key = util.extractAplphaNumeric(data[0]);
                        data.splice(0, 1);
                        if (data.join("").trim().length > 0) {
                            records[key] = data.map((val) => {
                                return util.extractNumeric(val);
                            });
                        }
                    }
                });
                resolve(records);
            } else {
                reject(error)
            }
        });
    });
};
