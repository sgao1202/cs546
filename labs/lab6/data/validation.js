// Takes in a string argument.
// Return true if the argument is non-empty, a string, and non-empty when trimmed; otherwise return false.
function validString(str) {
    if (!str || typeof str !== 'string' || !str.trim()) return false;
    return true;
}

// Takes in a date string and tries to convert it into a Date object.
// If it fails return false; otherwise return true if the conversion is successful.
function validDate(dateString) {
    // if (!validString(dateString)) return false;
    // const split = dateString.split('/');
    // if (split.length !== 3 || split[0].length !== 2 || split[1].length !== 2 || split[2].length !== 4) return false;
    const date = Date.parse(dateString);
    if (!validString(dateString) || isNaN(date) || date > Date.now()) return false;
    return true;
}

function validGenre(genre) {
    if (!Array.isArray(genre)) return false;
    const reducer = (acc, curr) => {
        return acc && curr;
    };
    const genres = genre.map(e => this.validString(e));
    return genres.reduce(reducer);
}

function validRating(rating) {
    if (!rating || !Number.isInteger(rating) || rating < 1 || rating > 5 ) return false;
    return true;
}

function isEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Return -1 if ds1 comes before ds2; return 0 if ds1 equals ds2; return 1 if ds1 comes after ds2
function compareDates(dateString1, dateString2) {
    const d1 = Date.parse(dateString1);
    const d2 = Date.parse(dateString2);
    if (d1 < d2) return -1;
    else if (d1 === d2) return 0;
    return 1;
}
// Takes in a MongoDB document (JavaScript object).
// Returns the same document with its _id field as a string.
function convertId(doc) {
    doc._id = doc._id.toString();
    return doc;
}

module.exports = {
    validString, 
    validDate,
    validGenre,
    validRating,
    isEqual,
    compareDates,
    convertId
};