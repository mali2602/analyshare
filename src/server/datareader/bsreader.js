'use strict';

var fs = require('fs');

const conf = require('./../util/config.js');
const datareader = require('./datareader.js');
const datagrouper = require('./datagrouper.js');
const util = require('./../util/util.js');
const cache = require('../service/cache-service.js');
const bsGroup = conf.bsData;

function readBalanceSheet(code, start, end) {
    const cacheKey = "bs-" + code;
    if (cache.get(cacheKey)) {
        console.log('Resolved BS from cache');
        return Promise.resolve(cache.get(cacheKey));
    } else {
        var url = util.formUrl(code, 'balance_VI', start, end);
        return datareader(url).then((data) => {
            const result = {
                years: data.years,
                data: datagrouper.groupIntoObject(data, bsGroup)
            };
            cache.set(cacheKey, result);
            return result;
        });
    }
}

module.exports.readBalanceSheet = readBalanceSheet;
