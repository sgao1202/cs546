function checkArray(array) {
    if (array == null) throw 'No argument found.';
    if (!Array.isArray(array)) throw 'Provided argument is not an array';
    if (array.length == 0) throw 'Array is empty.'
    if (!array.every(n => {
        return (typeof n == 'number');
    })) throw 'Each element in the array is not a number.';
}

function mean(array) {
    checkArray(array);  
    const sum = (accum, n) => {
        return accum + n;
    };
    return Math.round(array.reduce(sum) * 100 / array.length) / 100;
}

function medianSquared(array) {
    checkArray(array);
    array.sort();

    let middle = Math.floor(array.length / 2);
    if (array.length % 2 == 0) return Math.pow((array[middle] + array[middle - 1]) / 2, 2);
    return Math.pow(array[middle], 2);
}

function maxElement(array) {
    checkArray(array);
    let maxIndex = 0;
    let max = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
            maxIndex = i;
        }
    }
    const result = {};
    result[max] = maxIndex;
    return result;
}

function checkArray2(array, variableName="Provided argument") {
    if (array == null) throw `${variableName} is null.`;
    if (!Array.isArray(array)) throw `${variableName} is not an array.`;
}

function fill(end, value) {
    if (end == null) throw 'End argument is required.';
    if (typeof end != 'number') throw 'End argument provided is not a number.';
    if (end <= 0) throw 'End argument provided cannot be less than or equal to 0.';

    const arr = [];
    if (value == null) {
        for (let i = 0; i < end; i++) {
            arr.push(i);
        }
    } else {
        for (let i = 0; i < end; i++) {
            arr.push(value);
        }
    }
    return arr;
}

function countRepeating(array) {
    checkArray2(array);
    const counts = {};
    let currElement = null;
    let freq = 0;
    array.sort()

    for (let i = 0; i < array.length; i++) {
        if (array[i] != currElement) {
            if (freq > 1) counts[currElement] = freq;
            currElement = array[i];
            freq = 1;
        } else {
            freq++;
        }
    }
    if (freq > 1) counts[currElement] = freq;
    return counts;
}

function compare(a, b) {
    if (typeof a != typeof b) {
        if (typeof a == 'string' && typeof b == 'number') return 1;
        if (typeof a == 'string' && typeof b == 'boolean') return 1;
        if (typeof a == 'string' && typeof b == 'object') return -1;

        if (typeof a == 'number' && typeof b == 'string') return -1;
        if (typeof a == 'number' && typeof b == 'boolean') return -1;
        if (typeof a == 'number' && typeof b == 'object') return -1;
        
        if (typeof a == 'boolean' && typeof b == 'number') return 1;
        if (typeof a == 'boolean' && typeof b == 'string') return -1
        if (typeof a == 'boolean' && typeof b == 'object') return -1

        if (typeof a == 'object' && typeof b == 'number') return 1;
        if (typeof a == 'object' && typeof b == 'string') return 1;
        if (typeof a == 'object' && typeof b == 'boolean') return 1;
    } else {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    }
}

function arrayEqual(arr1, arr2) {
    if (arr1.length == 0 && arr2.length == 0) return true;
    if (arr1.length != arr2.length) return false;
    arr1.sort(compare);
    arr2.sort(compare);
    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            //return arrayEqual(arr1[i], arr2[i]) && arrayEqual(arr1.slice(1, arr1.length), arr2.slice(1, arr2.length));
            if (!arrayEqual(arr1[i], arr2[i])) return false;
        } else if ((!Array.isArray(arr1[i]) && Array.isArray(arr2[i])) || (Array.isArray(arr1[i]) && !Array.isArray(arr2[i])) || (arr1[i] !== arr2[i])) {
            return false;
        }
    }
    return true;
}

function isEqual(arrayOne, arrayTwo) {
    checkArray2(arrayOne, "arrayOne");
    checkArray2(arrayTwo, "arrayTwo");
    return arrayEqual(arrayOne, arrayTwo);
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};