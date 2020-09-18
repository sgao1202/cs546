function checkString(string) {
    if (!string) throw 'String not found';
    if (string.length <= 0) throw 'String length must be greater than 0';
    if (typeof string != 'string') throw 'Type of input must be a string';
}

function camelCase(string) {
    checkString(string);
    const space = " ";
    let result = "";
    let flag = false;
    for (char of string) {
        if (flag) {
            result += char.toUpperCase();
            flag = false;
        } else if (char === space) {
            flag = true;
        } else {
            result += char;
        }
    }
    return result;
}

function replaceChar(string) {

}

function mashUp(string1, string2) {

}