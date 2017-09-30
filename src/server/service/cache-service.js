const cache = {};

const set = (key, value) => {
    cache[key] = value;
};

const get = (key) => {
    return cache[key];
};

module.exports = {
    set: set,
    get: get
};
