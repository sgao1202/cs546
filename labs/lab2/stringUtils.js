function checkString(string, lengthNum=0) {
    if (!string) throw 'String not found';
    if (typeof string != 'string') throw 'Type of input must be a string';

    let str = string.trim();
    if (str.length <= lengthNum) throw `String length must be greater than ${lengthNum}`;
}

function camelCase(string) {
    checkString(string);
    const str = string.trim();
    const space = " ";
    let result = "";
    let flag = false;
    for (char of str) {
        if (flag && char != space) {
            result += char.toUpperCase();
            flag = false;
        } else if (char === space) {
            flag = true;
        } else {
            result += char.toLowerCase();
        }
    }
    return result;
}

function replaceChar(string) {
    checkString(string);
    const str = string.trim();
    let result = str[0];
    let first = str[0].toLowerCase();
    const star = '*';
    const dollar = '$';
    let flag = false;
    
    for (let i = 1; i < str.length; i++) {
        let currentChar = str[i].toLowerCase();
        if (currentChar == first) {
            if (flag) {
                result += dollar;
                flag = false;
            } else {
                result += star;
                flag = true;
            }
        } else result += str[i];
    }
    return result;
}

function mashUp(string1, string2) {
    checkString(string1, 1);
    checkString(string2, 1);
    const string1Trimmed = string1.trim();
    const string2Trimmed = string2.trim();

    let str1 = string1Trimmed.slice(0, 2);
    let strhalf1 = string1Trimmed.slice(2);
    let str2 = string2Trimmed.slice(0, 2);
    let strhalf2 = string2Trimmed.slice(2);

    return `${str2}${strhalf1} ${str1}${strhalf2}`;
}

module.exports = {
    camelCase,
    replaceChar,
    mashUp
};