const _ = require('lodash');
const propertyKeys = {
    fcf: 'cf.data[${index}].fcf',
    profit_growth_5years: 'details.warehouse_set.profit_growth_5years',
    profit_growth_10years: 'details.warehouse_set.profit_growth_10years',
    short_term_borrowing: 'bs.data[${index}].noncurrentliabilities.longtermborrowings',
    long_term_borrowing: 'bs.data[${index}].currentliabilities.shorttermborrowings',
    cashandcashequivalents: 'bs.data[${index}].currentassets.cashandcashequivalents',
    currentinvestments: 'bs.data[${index}].currentassets.currentinvestments',
    no_of_shares: 'details.no_of_shares'
};

const getProperty = (object, key, index) => {
    let propKey = propertyKeys[key];
    if (index !== undefined) {
        propKey = propKey.replace('${index}', index);
    }
    const value = _.get(object, propKey);
    return value;
}

module.exports = {
    getFCF(object, size) {
        return Array.apply(undefined, Array(size)).map((v, i) => {
            return getProperty(object, 'fcf', i)
        });
    },
    getProfitGrowthRate(object) {
        return {
            first: getProperty(object, 'profit_growth_5years'),
            second: getProperty(object, 'profit_growth_10years')
        }
    },
    getNetDebt(object) {
        return getProperty(object, 'long_term_borrowing', 0)
            + getProperty(object, 'short_term_borrowing', 0)
            - getProperty(object, 'cashandcashequivalents', 0)
            - getProperty(object, 'currentinvestments', 0);
    },
    getNoOfShares(object) {
        return getProperty(object, 'no_of_shares');
    }
}
