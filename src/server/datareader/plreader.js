'use strict';

var fs = require('fs');

const conf = require('./../util/config.js');
const datareader = require('./datareader.js');
const datagrouper = require('./datagrouper.js');
const util = require('./../util/util.js');
const plData = conf.plData;
const cache = require('../service/cache-service.js');

function readProfitLoss(code, start, end) {
    const cacheKey = "pl-" + code;
    if (cache.get(cacheKey)) {
        console.log('Resolved PL from cache');
        return Promise.resolve(cache.get(cacheKey));
    } else {
        var url = util.formUrl(code, 'profit_VI', start, end);
        return datareader(url).then((data) => {
            const result = {
                years: data.years,
                data: datagrouper.groupIntoObject(data, plData)
            };
            cache.set(cacheKey, result);
            return result;
        });
    }
}

module.exports.readProfitLoss = readProfitLoss;
