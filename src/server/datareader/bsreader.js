const conf = require('./../util/config.js');
const datareader = require('./datareader.js');
const datagrouper = require('./datagrouper.js');
const util = require('./../util/util.js');
const cache = require('../service/cache-service.js');
const fileDataSource = require('../service/fileDataSource.js');
const bsGroup = conf.bsData;
const fileName = 'balancesheet.json';
const transformResults = (data, cacheKey) => {
    const result = {
        years: data.years,
        data: datagrouper.groupIntoObject(data, bsGroup)
    };
    cache.set(cacheKey, result);
    return result;
}

function readBalanceSheet(params) {
    const code = params.mccode;
    const stockCode = params.code;
    const cacheKey = "bs-" + code;
    if (cache.get(cacheKey)) {
        console.log('Resolved BS from cache');
        return Promise.resolve(cache.get(cacheKey));
    } else {
        let fileContents = null;
        try {
            fileContents = fileDataSource.readJSONFile(stockCode, fileName);
        } catch(e) {
            console.log(`No file contents for ${stockCode}/${fileName}`);
        }
        if (fileContents) {
            const result = transformResults(fileContents, cacheKey);
            console.log(`Resolved BS from ${stockCode}/${fileName}`);
            return Promise.resolve(result);
        } else {
            var url = util.formUrl(code, 'balance_VI', params.start, params.end);
            return datareader(url).then((data) => {
                fileDataSource.writeJSONToFile(stockCode, fileName, data);
                return transformResults(data, cacheKey);
            });
        }
    }
}

module.exports.readBalanceSheet = readBalanceSheet;
