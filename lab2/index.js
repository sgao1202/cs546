const arrayUtils = require('./arrayUtils');

// mean tests
console.log("----------------------------------------------------------------");
try {
    const mean1 = arrayUtils.mean([2,3,4]);
    console.log('mean passed successfully');
} catch (e) {
    console.log(e);
    console.error('mean failed test case');
}

try {
    const mean2 = arrayUtils.mean(1234);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    const mean3 = arrayUtils.mean();
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    const mean4 = arrayUtils.mean([]);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    const mean5 = arrayUtils.mean([1,2,3, "annyeong", null]);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    const mean6 = arrayUtils.mean([1,2,3, null, "annyeong"]);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

try {
    const mean7 = arrayUtils.mean([2,5,1,5.5,6.8]);
    console.log(mean7);
    console.log('mean passed successfully');
} catch (e) {
    console.log('mean failed test case');
}

// medianSquared tests
try {
    let median1 = arrayUtils.medianSquared([1, 2, 4]); // Returns: 4
    console.log(median1);
    console.log("median squared passed successfully");
} catch (e) {
    console.log("median failed test case")
}

try {
    let median2 = arrayUtils.medianSquared([]); //throws an error
    console.log("median did not error");
} catch (e) {
    console.log("median failed successfully")
}

try {
    let median3= arrayUtils.medianSquared([]); //throws an error
    console.log("median did not error");
} catch (e) {
    console.log("median failed successfully")
}
/*
arrayUtils.medianSquared("banana"); // throws an error
arrayUtils.medianSquared(1,2,3); // throws an error
arrayUtils.medianSquared(["guitar", 1, 3, "apple"]); // throws an error
arrayUtils.medianSquared(); // throws an error
*/