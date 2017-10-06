const path = require('path');
const fs = require('fs');
const conf = require('../util/config.js');
const config = conf.config;

const dataDir = config.dataDir;
const readFile = (dir, file) => fs.readFileSync(path.join(dataDir, dir, file), 'utf8');
const readJSONFile = (dir, file) => JSON.parse(readFile(dir, file));

const writeJSONToFile = (dir, file, data) => {
    const stockDir = path.join(dataDir, dir);
    const filepath = path.join(stockDir, file);
    if (!fs.existsSync(stockDir)) {
        fs.mkdirSync(stockDir);
    }
    console.log(`Writing to`, filepath);
    fs.closeSync(fs.openSync(filepath, 'w'));
    fs.writeFileSync(filepath, JSON.stringify(data));
};
module.exports.readJSONFile = readJSONFile;
module.exports.writeJSONToFile = writeJSONToFile;
