var request = require('request');
const util = require('./../util/util.js');
const cache = require('./cache-service.js');
const conf = require('./../util/config.js');
const datagrouper = require('../datareader/datagrouper.js');

function getYears(data) {
    data.splice(0, 1);
    return data.map(entry => 2000 + parseInt(entry.replace('Mar', '').trim()));
}

const getDetails = (code) => {
    const url = util.getScreenerUrl(code);
    return new Promise((resolve, reject) => {
        const cacheKey = "comp-data-" + code;
        if (cache.get(cacheKey)) {
            console.log('Resolving data from cache');
            resolve(cache.get(cacheKey));
        } else {
            request(url, function(error, response) {
                if (!error) {
                    const data = JSON.parse(response.body);
                    cache.set(cacheKey, data);
                    resolve(data);
                } else {
                    reject(error)
                }
            });
        }
    });
};

const getInvestingActivity = (id, sessionid) => {
    const url = util.getScreenerCFUrl(id);
    const options = {
        url,
        headers: {
            'cookie': 'sessionid=' + sessionid
        }
    };
    return new Promise((resolve, reject) => {
        const cacheKey = "comp-data-cf-" + id;
        if (cache.get(cacheKey)) {
            console.log('Resolving data from cache');
            resolve(cache.get(cacheKey));
        } else {
            request(options, function(error, response) {
                if (!error) {
                    const data = JSON.parse(response.body);
                    cache.set(cacheKey, data);
                    resolve(data);
                } else {
                    reject(error)
                }
            });
        }
    });
};

module.exports.getDetails = getDetails;

module.exports.getCF = function(code, sessionid) {
    return getDetails(code)
        .then(data => {
            const years = util.getYearsSorted(data.number_set.cashflow[0][1]);
            const cashflow = {
                years: years,
                data: {
                    years: years
                }
            };
            data.number_set.cashflow.forEach((cf) => {
                cashflow.data[util.extractAplphaNumeric(cf[0])] = util.sortByYear(cf[1])
            });
            return getInvestingActivity(data.warehouse_set.id, sessionid)
            .then((cfdetails) => {
                cfdetails.forEach((cf) => {
                    cashflow.data[util.extractAplphaNumeric(cf[0])] = util.sortByYear(cf[1])
                });
                cashflow.data = datagrouper.groupIntoObject(cashflow.data, conf.cfData);
                return cashflow;
            })
            .catch(e => {
                console.error(e);
                return cashflow;
            });
        })
        .catch(e => console.error('errrrrr', e));
};
