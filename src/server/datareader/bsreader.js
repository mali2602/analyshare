'use strict';

var fs = require('fs');

const conf = require('./../util/config.js');
const datareader = require('./datareader.js');
const datagrouper = require('./datagrouper.js');
const util = require('./../util/util.js');
const bsGroup = conf.bsData;

function readBalanceSheet(code, start, end) {
    var url = util.formUrl(code, 'balance_VI', start, end);
    return datareader(url).then((data) => {
        console.log(JSON.stringify(data));
        return {
            years: data.years,
            data: datagrouper.groupIntoObject(data, bsGroup)
        };
    });
}

module.exports.readBalanceSheet = readBalanceSheet;
