'use strict';

var fs = require('fs');

const conf = require('./../util/config.js');
const datareader = require('./datareader.js');
const datagrouper = require('./datagrouper.js');
const util = require('./../util/util.js');
const plData = conf.plData;

function readProfitLoss(code, start, end) {
    var url = util.formUrl(code, 'profit_VI', start, end);
    return datareader(url).then((data) => {
        return {
            years: data.years,
            data: datagrouper.groupIntoObject(data, plData)
        };
    });
}

module.exports.readProfitLoss = readProfitLoss;
