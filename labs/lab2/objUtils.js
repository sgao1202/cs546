function makeArrays(objects) {
    if (!objects) throw 'Array of objects must be supplied';
    if (!Array.isArray(objects)) throw 'Provided objects argument must an array';
    if (objects.length < 2) throw 'There must be at least 2 elements in the array of objects';

    let results = [];
    for (x of objects) {
        if (typeof x != 'object' && x != null) throw 'All elements in the array must be an object';
        if (Object.keys(x).length == 0) throw 'Object cannot be empty';

        for (key in x) {
            results.push([key, x[key]]);
        }
    }
    return results;
}

function isDeepEqual(obj1, obj2) {
    if (obj1 == null || obj2 == null) throw 'Comparison objects must be provided';
    if (typeof obj1 != 'object' || typeof obj2 != 'object') throw 'Comparison objects must be of type object';

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) return false;
    for (key in obj1) {
        if (!obj2.hasOwnProperty(key)) return false;
        if (typeof obj1[key] == 'object' && typeof obj1[key] == typeof obj2[key]) {
            if (!isDeepEqual(obj1[key], obj2[key])) return false;
        } else if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}

function computeObject(object, func) {
    if (object == null) throw 'Object must be provided';
    if (func == null) throw 'Function must be provided';
    if (typeof object != 'object') throw 'Provided object is not of type object';
    if (typeof func != 'function') throw 'Provided function is not of type function';

    const result = {};
    for (key in object) {
        result[key] = func(object[key]);
    }
    return result;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
};