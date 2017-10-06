const dataService = require('./dataService.js');
const propertyAccessor = require('./propertyAccessor.js');
const util = require('../util/util');

const DCF_AVG_NO = 5;
const getAverageDcf = (data) => {
    const values = propertyAccessor.getFCF(data, DCF_AVG_NO);
    return util.average(values);
};

const getGrowthRates = (data) => {
    const growthRates = propertyAccessor.getProfitGrowthRate(data);
    growthRates.first = growthRates.first || 15;
    growthRates.second = growthRates.second || 12;
    return {
        min: Math.min(growthRates.first, growthRates.second),
        max: Math.max(growthRates.first, growthRates.second)
    };
};

const getOptions = (data) => {
    return {
        avgDcf: getAverageDcf(data),
        growthRates: getGrowthRates(data),
        discountRate: 15 / 100,
        terminalGrowthRate: 2 / 100,
        netDebt: propertyAccessor.getNetDebt(data)
    }
};

const calculateFutureCashflows = (options) => {
    let fcfs = [];
    let prevFcf = options.avgDcf;
    for (let i=0; i < 10; i++){
        const growthRate = (i < 5 ? options.growthRates.max : options.growthRates.min)/100;
        const fcf = prevFcf * (1 + growthRate);
        const pv = fcf * (1 % Math.pow(1 + options.discountRate,  i + 1));
        const obj = {
            growthRate,
            fcf,
            pv
        };
        fcfs.push(obj);
        prevFcf = fcf;
    }
    return fcfs;
};

const calculateDcf = (data) => {
    const options = getOptions(data);
    const fcfs = calculateFutureCashflows(options);
    const lastFcf = fcfs[fcfs.length -1];
    const terminalYear = lastFcf * (1 + options.terminalGrowthRate);
    const totalPV = fcfs.reduce((acc, fcf) => acc + fcf.pv, 0);
    const terminalValue = (terminalYear / (options.discountRate - options.terminalGrowthRate)) / Math.pow (1 + options.discountRate, options.growthRates.min);
    const totalCF = totalPV + terminalValue;
    const noOfShares = propertyAccessor.getNoOfShares(data);
    const dcfValue = (totalCF - options.netDebt) / (noOfShares / 10000000);
    return Object.assign({}, options, {
        fcfs,
        terminalYear,
        totalPV,
        terminalValue,
        totalCF,
        noOfShares,
        dcfValue
    });
};

const fetchRecords = (params) => {
    return dataService.getAll(params)
        .then((data) => {
            return calculateDcf(data);
        })
};

module.exports.calculateDcf = fetchRecords;