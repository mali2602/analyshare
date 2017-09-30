'use strict';

var fs = require('fs');

const conf = require('./../util/config.js');
const datareader = require('./datareader.js');
const datagrouper = require('./datagrouper.js');
const util = require('./../util/util.js');
const cfGroup = conf.cfDataMC;

function readCashFlow(code, start, end) {
    var url = util.formUrl(code, 'cashflow_VI', start, end);
    return datareader(url).then((data) => {
        return {
            years: data.years,
            data: datagrouper.groupIntoObject(data, cfGroup)
        };
    });
}

module.exports.readCashFlow = readCashFlow;
