var request = require('request');
const util = require('./../util/util.js');
const cache = require('./cache-service.js');
const conf = require('./../util/config.js');
const datagrouper = require('../datareader/datagrouper.js');
const readBalanceSheet = require('../datareader/bsreader.js').readBalanceSheet;
const readProfitLoss = require('../datareader/plreader.js').readProfitLoss;
const investingFileName = 'investing-activity.json';
const fileDataSource = require('./fileDataSource.js');

const getYears = (data) => {
    data.splice(0, 1);
    return data.map(entry => 2000 + parseInt(entry.replace('Mar', '').trim()));
}
const getDate = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year + "-" + month + "-" + day;
}

const getDetails = (code) => {
    const fileName = `details-${getDate()}.json`;
    const url = util.getScreenerUrl(code);
    return new Promise((resolve, reject) => {
        const cacheKey = "comp-data-" + code;
        if (cache.get(cacheKey)) {
            console.log('Resolving details from cache');
            resolve(cache.get(cacheKey));
        } else {
            let fileContents = null;
            try {
                fileContents = fileDataSource.readJSONFile(code, fileName);
            } catch(e) {
                console.log(`No file contents for ${code}/${fileName}`);
            }
            if (fileContents) {
                console.log(`Resolved Details from ${code}/${fileName}`);
                cache.set(cacheKey, fileContents);
                return resolve(fileContents);
            } else {
                request(url, function(error, response) {
                    if (!error) {
                        const data = JSON.parse(response.body);
                        const n = (data.warehouse_set.market_capitalization / data.warehouse_set.current_price * 10000000)
                            .toFixed();
                        data.warehouse_set.no_of_shares = Number.parseInt(n);
                        fileDataSource.writeJSONToFile(code, fileName, data);
                        cache.set(cacheKey, data);
                        resolve(data);
                    } else {
                        reject(error)
                    }
                });
            }
        }
    });
};

const getInvestingActivity = (id, sessionid, code) => {
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
            console.log('Resolving InvestingActivity from cache');
            resolve(cache.get(cacheKey));
        } else {
            let fileContents = null;
            try {
                fileContents = fileDataSource.readJSONFile(code, investingFileName);
            } catch(e) {
                console.log(`No file contents for ${code}/${investingFileName}`);
            }
            if (fileContents) {
                console.log(`Resolved IA from ${code}/${investingFileName}`);
                cache.set(cacheKey, fileContents);
                return resolve(fileContents);
            } else {
                request(options, function(error, response) {
                    if (!error) {
                        const data = JSON.parse(response.body);
                        cache.set(cacheKey, data);
                        fileDataSource.writeJSONToFile(code, investingFileName, data);
                        resolve(data);
                    } else {
                        reject(error)
                    }
                });
            }
        }
    });
};

const getCF = (params) => {
    const code = params.code;
    const sessionid = params.sessionid;
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
            return getInvestingActivity(data.warehouse_set.id, sessionid, code)
            .then((cfdetails) => {
                if (cfdetails && Array.isArray(cfdetails)) {
                    cfdetails.forEach((cf) => {
                        cashflow.data[util.extractAplphaNumeric(cf[0])] = util.sortByYear(cf[1])
                    });
                    cashflow.data.fcf = [];
                    cashflow.data.cashfromoperatingactivity.forEach((cost, index) => {
                        purchaseCost = cashflow.data.fixedassetspurchased[index];
                        if (purchaseCost !== undefined) {
                            const fcf = (cost - purchaseCost).toFixed(2);
                            cashflow.data.fcf.push(Number.parseInt(fcf));
                        }
                    });
                }
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

module.exports.getDetails = getDetails;
module.exports.getCF = getCF;
module.exports.getAll = (params) => {
    return Promise.all([
        getDetails(params.code),
        getCF(params),
        readBalanceSheet(params),
        readProfitLoss(params)
    ]).then(values => {
        return {
            details: values[0],
            cf: values[1],
            bs: values[2],
            pl: values[3]
        }
    });
};
