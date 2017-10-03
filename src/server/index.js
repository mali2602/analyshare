var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors')

const config = require('./util/config.js').config;
const readBalanceSheet = require('./datareader/bsreader.js').readBalanceSheet;
const readProfitLoss = require('./datareader/plreader.js').readProfitLoss;
const readCashFlow = require('./datareader/cfreader.js').readCashFlow;
const dataService = require('./service/dataService.js');
const dcfCalculator = require('./service/dcfCalculator.js');
var port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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

router.get('/valuations/:code', function(req, res){
    dcfCalculator.calculateDcf({
        code: req.params.code,
        mccode: req.query.mccode,
        sessionid: req.query.sessionid
    }).then(data => res.send(data));
});

router.get('/data/:code', function(req, res){
    dataService.getDetails(req.params.code).then(data => {
        const warehouse = data.warehouse_set;
        const trimmedData = Object.assign({}, data.warehouse_set, {
            id: data.id,
            name: data.name,
            bse_code: data.bse_code,
            short_name: data.short_name,
            nse_code: data.nse_code
        });
        res.send(trimmedData);
    });
});

app.use('/api', router);
// app.use('/client', express.static(config.clientPath));

app.listen(port, function(){
    console.log("Listening on port", port, "..........");
});
