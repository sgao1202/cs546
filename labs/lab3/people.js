const axios = require('axios');
let personData = undefined;

async function getPeople() {
    const { data }  = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    //return parsedData // this will be the array of people objects
    personData = data;
    return data;
}

async function getPersonById(id) {
    if (id == null) throw 'ID must be given';
    if (typeof id != 'number') throw 'Type of ID must be a number';
    // Get the array of people objects
    if (!personData) await getPeople();
    if (id <= 0 || id > personData.slice(-1)[0].id) throw `ID must be in range`;
    return personData.find(p => p.id === id);
}

async function howManyPerState(stateAbbrv) {
    if (!stateAbbrv) throw 'State must be given';
    if (typeof stateAbbrv !== 'string') throw 'State must be a string';
    const people = await getPeople();
    let count = 0;
    for (const p of people) {
        let currentState = p.address.state;
        if (currentState === stateAbbrv) count++;
    }
    if (count === 0) throw `No one lives in ${stateAbbrv}`;
    return count;
}

function computeAge(date) {
    const today = new Date();
    const birthDate = new Date(date);

    let age = today.getFullYear() -  birthDate.getFullYear();
    // Difference in months 
    const m = today.getMonth() - birthDate.getMonth();
    // A negative m value indicates that the age should decrement by 1
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getMonth())) age--;
    return age;
}

function compare(a, b) {
    const d1 = new Date(a.date_of_birth);
    const d2 = new Date(b.date_of_birth);
    const t1 = d1.valueOf();
    const t2 = d2.valueOf();
    if (t1 > t2) return 1;
    if (t1 < t2) return -1;
    return 0;
}

async function personByAge(index) {
    if (index == null) throw 'Index is not given';
    if (typeof index !== 'number') throw 'Given index is not a number';

    const people = await getPeople();
    if (index < 0 || index >= people.length) throw 'Index out of bounds';
   
    people.sort(compare);
    let person = people[index];
    let info = {
        first_name: person.first_name,
        last_name: person.last_name,
        date_of_birth: person.date_of_birth,
        age: computeAge(person.date_of_birth)
    };
    return info;
}

// Returns an object that represents counts of letters, vowels, and consonants.
// Does not count spaces or special characters such as ' or -.
function countLetters(str) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const vowels = 'aeiou'
    const consonants = 'bcdfghjklmnpqrstvxzwy';
    const results = {
        letters: 0,
        vowels: 0,
        consonants: 0
    };

    for (const char of str) {
        let currentChar = char.toLowerCase();
        if (letters.includes(currentChar)) {
            results.letters++;
            if (vowels.includes(currentChar)) {
                results.vowels++;
            } else {
                results.consonants++;
            }
        }
    }
    return results;
}

async function peopleMetrics() {
    const people = await getPeople();
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvxzwy';

    const metrics = {
        totalLetters: 0,        // sum of all the letters in all the first and last names combined (full names),
        totalVowels: 0,         // sum of all the vowels in all the first and last names combined (full names),
        totalConsonants: 0,     // sum of all the consonants in all the first and last names combined (full names),
        longestName: '',        // The longest name in the list (full name, so: first and last name combined),
        shortestName: '',       // The shortest name in the in the list (full name, so: first and last name combined)
        mostRepeatingCity: '',  // the name of the city that appears most in the list,
        averageAge: 0           // The average age of everyone in the list
    };

    const cities = {};
    for (const person of people) {
        const fullName = `${person.first_name} ${person.last_name}`;  // Full name with space
        let results = countLetters(fullName);
        metrics.totalLetters += results.letters;
        metrics.totalVowels += results.vowels;
        metrics.totalConsonants += results.consonants;

        const compareName = fullName.replace(' ', '');
        const currentLongest = metrics.longestName.replace(' ', '');
        const currentShortest = metrics.shortestName.replace(' ', '');

        if (compareName.length > currentLongest.length || !metrics.longestName) metrics.longestName = fullName;
        if (compareName.length < currentShortest.length || !metrics.shortestName) metrics.shortestName = fullName;
        
        const currentCity = person.address.city;
        if (!(currentCity in cities)) cities[currentCity] = 0;
        cities[currentCity]++;
        metrics.averageAge += computeAge(person.date_of_birth);
    }
    metrics.averageAge = Math.floor(metrics.averageAge / people.length);
    let maxCount = 0;
    for (const city in cities) {
        if (cities[city] > maxCount) {
            metrics.mostRepeatingCity = city;
            maxCount = cities[city];
        }
    }
    return metrics;
}

module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}