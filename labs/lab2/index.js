const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

//  mean tests
try {
    const mean1 = arrayUtils.mean([2,3,4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}

try {
    const mean2 = arrayUtils.mean(1234);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

//  medianSquared tests
try {
    const median1 = arrayUtils.medianSquared([1,5,4,6,7,3,4]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed test case');
}

try {
    const median2 = arrayUtils.medianSquared();
    console.error('medianSquared did not error');
} catch (e) {
    console.log('medianSquared failed successfully');
}

// maxElement tests
try {
    const max1 = arrayUtils.maxElement([5, 6, 7]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed test case');
}

try {
    const max1 = arrayUtils.maxElement([]);
    console.error('maxElements did not error');
} catch (e) {
    console.log('maxElements failed successfully');
}

// fill tests
try {
    const fill1 = arrayUtils.fill(6);
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed test case');
}

try {
    const fill2 = arrayUtils.faill(0);
    console.error('fill did not error');
} catch (e) {
    console.log('fill passed successfully');
}

// countRepeating tests
try {
    const count1 = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed test case');
}

try {
    const count2 = arrayUtils.countRepeating('annyeong');
    console.error('countRepeating did not error');
} catch (e) {
    console.log('countRepeating failed successfully');
}

// isEqual tests
try {
    const equal1 = arrayUtils.isEqual([true, false,'hello', 5, 3], [3, 'hello', true, 5, false]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed test case');
}

try {
    const equal2 = arrayUtils.isEqual('hello', []);
    console.error('isEqual did not error');
} catch (e) {
    console.log('isEqual failed successfully');
}

// camelCase tests
try {
    const camel1 = stringUtils.camelCase('my function rocks');
    console.log('camelCase passed succcessfully');
} catch (e) {
    console.error('camelCase failed test case');
}

try {
    const camel2 = stringUtils.camelCase('');
    console.error('camelCase did not error');
} catch (e) {
    console.log('camcelCase failed successfully');
}

// replaceChar tests
try {
    const replace1 = stringUtils.replaceChar("babbbbble");
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}

try {
    const replace2 = stringUtils.replaceChar(123);
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}

// mashUp tests
try {
    const mash1 = stringUtils.mashUp("hello", "world");
    console.log('mashUp passed succcessfully');
} catch (e) {
    console.error('mashUp failed test case');
}

try {
    const mash2 = stringUtils.mashUp('h', 'Hello');
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}

// makeArrays tests
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
try {
    const make1 = objUtils.makeArrays([first, second, third]);
    console.log('makeArrays passed successfully');
} catch (e) {
    console.error('makeArrays failed test case');
}

try {
    const make2 = objUtils.makeArrays([1, "hello", true]);
    console.error('makeArrays did not error');
} catch (e) {
    console.log('makeArrays failed successfully');
}

// isDeepEqual tests
const obj6 = {  e: {},
                c: true, 
                b: 7, 
                d: "Test", 
                a: {sB: "There", sC: "Class", sA: "Hello"}
             };

const obj7 = {  a: {sA: "Hello", sB: "There", sC: "Class"}, 
                b: 7, c: true, 
                d: "Test",
                e: {    name: "Simon", 
                        age: 20}
             };
try {
    const deep1 = objUtils.isDeepEqual(obj6, obj7);
    console.log('isDeepEqual passed successfully');
} catch (e) {
    console.error('isDeepEqual failed test case');
}

try {
    const deep2 = objUtils.isDeepEqual("hello");
    console.error('isDeepEqual did not error');
} catch (e) {
    console.log('isDeepEqual failed successfully');
}

// computeObject tests
try {
    const compute1 = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed succcessfully');
} catch (e) {
    console.error('computeObject failed test case');
}

try {
    const compute2 = objUtils.computeObject();
    console.error('computeObject did not error');
} catch (e) {
    console.log('computeObject failed successfully');
}