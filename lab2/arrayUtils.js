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
        accum + n;
    };
    return array.reduce(sum) / array.length;
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

function arrayEqual(arr1, arr2) {
    if (arr1.length != arr2.length) return false;
    arr1.sort();
    arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            console.log("reached here");
            arrayEqual(arr1[i], arr2[i]);
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

console.log(medianSquared([1, 2, 4]));     // 4
console.log(medianSquared([1,2]));
console.log(medianSquared([1,3]));
console.log(medianSquared([1, 3, 4, 5]));     // 16
console.log(medianSquared([1, 2, 3, 5, 6, 7]));
console.log(medianSquared([1,5,4,6,7,3,4]));       //[1, 3, 4, 4, 5, 6, 7]
console.log(medianSquared([1]));
console.log();

console.log(maxElement([5, 6, 7])); // Returns: {'7': 2}
console.log(maxElement([5,1,3,2]));
console.log(maxElement([5,1,3,2,10]));
console.log(maxElement([5,1,15, 3,2, 15]));
console.log();

console.log(fill(1)); // Returns: [0, 1, 2, 3, 4, 5]
console.log(fill(6)); // Returns: [0, 1, 2, 3, 4, 5]
console.log(fill(3, 'Welcome')); // Returns: ['Welcome', 'Welcome', 'Welcome']
console.log();
/*
fill(); // Throws error
fill("test"); // Throws error
fill(0); // Throws Error
fill(-4); // Throws Error
*/

console.log(countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]));
console.log(countRepeating([13, 7, '7', true, true, "Hello", "hello", true, 'Hello']));
console.log(countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello", "hello"]));
console.log(countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello", "hello", "hi"]));
console.log(countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello", "hello", "hi", 'hi']));
console.log();

console.log(isEqual([1, 2, 3], [3, 1, 2])); // Returns: true
console.log(isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z'])); // Returns: true
console.log(isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
console.log(isEqual([1, 3, 2], [1, 2, 3, 4])); // Returns: false
console.log(isEqual([1, 2], [1, 2, 3])); // Returns: false
console.log();

console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]])); // Returns: true
console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]])); // Returns: false
console.log(isEqual([ 1, 2, 3 ], [ 3, 1, 2]));      // Returns true
console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ]]));      //Returns false