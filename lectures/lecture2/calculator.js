function checkIsProperNumber(val, variableName='Provided variable') {
    if (typeof val !== 'number') throw `${variableName} is not a number`;
    if (isNaN(val)) throw '${variableName} is NaN';
}

module.exports = {
    description: 'This is a calculator for CS-546',
    divideTwoNumbers: (num, den) => {
        checkIsProperNumber(num, 'numerator');
        checkIsProperNumber(den, 'denominator');
        if (den === 0) throw 'Error: division by zero';
        return num / den;
    },
    addTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, 'First Number');
        checkIsProperNumber(num2, 'Second Number');
        return num1 + num2;
    },
    subtractTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, 'First Number');
        checkIsProperNumber(num2, 'Second Number');
        return num1 - num2;
    },
    multiplyTwoNumbers: (num1, num2) => {
        checkIsProperNumber(num1, 'First Number');
        checkIsProperNumber(num2, 'Second Number');
        return num1 * num2;
    }
};