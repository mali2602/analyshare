var expect = require('chai').expect;
var util = require('../../../src/server/util/util.js');

describe('util.extractNumeric', () => {
    it('should extract float', () => {
        expect(util.extractNumeric('58,669.82')).to.equal(58669.82);
    });

    it('should extract float for negative number ', () => {
        expect(util.extractNumeric('-58,669.82')).to.equal(-58669.82);
    });

    it('should be undefined for only - ', () => {
        expect(util.extractNumeric('-')).to.equal(undefined);
    });
});
