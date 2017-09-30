var expect = require('chai').expect;
var dataGrouper = require('../../../src/server/datareader/datagrouper.js');

describe('dataGrouper', () => {

    it('.groupIntoObject should generate Objects', () => {
        var obj = {
            years: [2016],
            key1: ['1'],
            key2: [200.43],
            key3: ['3'],
            key4: ['4'],
            key5: [3034.456],
            key6: [-100.34]
        };
        var group = {
            key12: { components: ['key1', 'key2'] },
            key3: 'key3',
            key47: {
                components: [
                    'key4', {
                        name: 'key5',
                        components: ['key5', 'key1']
                    },
                    'key6'
                ]
            }

        };
        var expected = {
            key12: { "key1": "1", "key2": 200.43 },
            key3: "3",
            key47: {
                key4: "4",
                key5: { "key5": 3034.456, "key1": "1" },
                key6: -100.34
            }
        };

        var result = dataGrouper.groupIntoObject(obj, group)[0];
        expect(result).to.deep.equal(expected);
    });
});
