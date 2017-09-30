'use strict';
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('src/server/config.json', 'utf8'));

module.exports.config = config;
module.exports.bsData = JSON.parse(fs.readFileSync('src/server/properties/balancesheet.json', 'utf8'));
module.exports.cfData = JSON.parse(fs.readFileSync('src/server/properties/cashflow.json', 'utf8'));
module.exports.cfDataMC = JSON.parse(fs.readFileSync('src/server/properties/cashflow-mc.json', 'utf8'));
module.exports.plData = JSON.parse(fs.readFileSync('src/server/properties/profitloss.json', 'utf8'));
