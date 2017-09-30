var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const config = require('./util/config.js').config;
const readBalanceSheet = require('./datareader/bsreader.js').readBalanceSheet;
const readProfitLoss = require('./datareader/plreader.js').readProfitLoss;
const readCashFlow = require('./datareader/cfreader.js').readCashFlow;
const dataService = require('./service/dataService.js');
var port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/balancesheet/:code', function(req, res){
    readBalanceSheet(req.params.code).then(data => res.send(data));
});

router.get('/profitloss/:code', function(req, res){
    readProfitLoss(req.params.code).then(data => res.send(data));
});

router.get('/cashflow/deprecated/:code', function(req, res){
    readCashFlow(req.params.code).then(data => res.send(data));
});

router.get('/cashflow/:code', function(req, res){
    dataService.getCF(req.params.code, req.query.sessionid).then(data => res.send(data));
});

router.get('/data/:code', function(req, res){
    dataService.getDetails(req.params.code).then(data => res.send(data));
});

app.use('/api', router);
app.use('/client', express.static(config.clientPath));

app.listen(port, function(){
    console.log("Listening on port", port, "..........");
});
