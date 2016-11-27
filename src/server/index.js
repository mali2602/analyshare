var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('src/server/config.json', 'utf8'));
console.log('Using configs', JSON.stringify(config));
var port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/balancesheet', function(req, res){
    res.send({
        str: 'Test Data',
        bool: true,
        num: 10,
        float: 10.10
    });
});

app.use('/api', router);
app.listen(port, function(){
    console.log("Listening on port", port, "..........");
});
