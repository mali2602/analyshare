const _ = require('lodash');
const conf = require('./config.js');
const config = conf.config;

module.exports.extractAplphaNumeric = function (str) {
    return str && str.replace(/[^a-z0-9+]+/ig, '').toLowerCase();
};

module.exports.extractNumeric = function (str) {
    var numStr = str && str.replace(/[^(0-9|\.|\-)]+/g, '');
    if (numStr && numStr !== '-') {
        return parseFloat(numStr);
    }
    return undefined;
};

module.exports.formUrl = function (code, type, start, end) {
    var url = config.data_source;
    start = start || '201603';
    end = end || '201203';
    url = url.replace('{stockCode}', code);
    url = url.replace('{startYear}', start);
    url = url.replace('{endYear}', end);
    url = url.replace('{type}', type);
    return url;
}

module.exports.getScreenerUrl = function (code) {
    var url = config.screenerDS;
    return url.replace('{code}', code);
}

module.exports.getScreenerCFUrl = function (id) {
    var url = config.screenerDSCf;
    return url.replace('{id}', id).replace('{id}', id);
}

module.exports.getYearsSorted = (data) => {
    const keys = _.keys(data);
    const years = _.map(keys, key => Number.parseInt(key.split('-')[0]));
    return _.orderBy(years, undefined, 'desc');
};

module.exports.sortByYear = (data) => {
    const keyMapping = {};
    const keys = _.keys(data);
    const years = _.map(keys, (key) => {
        const year =key.split('-')[0];
        keyMapping[year] = key;
        return Number.parseInt(year);
    });
    const sortedYears = _.orderBy(years, undefined, 'desc');
    const sortedValues = sortedYears.map((year) => {
        const key = keyMapping['' + year];
        return data[key];
    });
    return sortedValues;
};

module.exports.average = arr => arr.reduce( ( a, b ) => a + b, 0 ) / arr.length;
