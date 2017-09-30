'use strict';

var getValue = function(key, input, index) {
    if (input[key]) {
        return input[key][index];
    }
    return undefined;
}

var addTotal = function(obj, key, input, index) {
    if (key) {
        obj[key] = getValue(key, input, index);
    }
}

var formObjFromKeys = function(input, keys, index, computeTotal) {
    var obj = {};
    var total = 0;
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof key === 'string') {
            obj[key] = getValue(key, input, index);
            if (obj[key]) {
                total += obj[key];
            }
        } else {
            obj[key.name] = formObjFromKeys(input, key.components, index);
            addTotal(obj[key.name], key.total, input, index);
            total += obj[key.total][key.total];
        if (Math.round(obj[key.name].totalComputed) === Math.round(obj[key.total][key.total])) {
                delete obj[key.name].totalComputed;
            } else {
                obj.errorKeys = obj.errorKeys || [];
                obj.errorKeys.push(key);
            }
        }
    }
    obj.totalComputed = total;
    return obj;
}

var groupNested = function(input, keyGroup, index) {
    var result = {errorKeys:[]};
    for (var key in keyGroup) {
        if (typeof keyGroup[key] === 'string') {
            result[key] = getValue(key, input, index);
        } else {
            result[key] = formObjFromKeys(input, keyGroup[key].components, index, keyGroup[key].total);
            addTotal(result[key], keyGroup[key].total, input, index);
            if (Math.round(result[key].totalComputed) === Math.round(result[key][keyGroup[key].total])) {
                delete result[key].totalComputed;
            } else {
                result.errorKeys.push(key);
            }
        }
    }
    if(result.errorKeys.length === 0){
        delete result.errorKeys;
    }
    return result;
};

module.exports.groupIntoObject = function(obj, objGroup) {
    var result = [];
    for (var i = 0; i < obj.years.length; i++) {
        result.push(groupNested(obj, objGroup, i));
    }
    return result;
};
