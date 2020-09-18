const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let primes = {};
    if (arr != null) {
        let isPrime = function(n) {
            // Returns true if the input number 'n' is prime; false otherwise.
            if (n <= 1) {
                return false;
            }
            for (let i = 2; i < n; i++) {
                if (n % i == 0) {
                    return false;
                }
            }
            return true;
        };
        for (num of arr) {
            primes[num] = isPrime(num);
        }
    }
    return primes;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if (arr == null || arr.length == 0) {
        return 0;
    }
    let sum = 0;
    for (n of arr) {
        sum += n * n;
    }
    let raisedToPower = Math.pow(sum, 6);
    return Math.sqrt(raisedToPower);
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    const results = {
        consonants: 0,
        vowels: 0,
        numbers: 0,
        spaces: 0, 
        punctuations: 0,
        specialCharacters: 0
    };

    const consonants = "bcdfghjklmnpqrstvxzwy";
    const vowels = "aeiou";
    const numbers= "0123456789";
    const space = " ";
    const punctuations = [".", "?", '"', "'", ",", "-", "!", ":", ";", "(", ")", "[", "]", "...", "/", "—"];
    const specialCharacters = "#$%&^";
    
    for (char of text) {
        let lowerChar = char.toLowerCase();
        if (lowerChar == space) {
            results.spaces += 1;
        } else if (consonants.includes(lowerChar)) {
            results.consonants += 1;
        } else if (vowels.includes(lowerChar)) {
            results.vowels += 1;
        } else if (numbers.includes(lowerChar)) {
            results.numbers += 1;
        } else if (punctuations.includes(lowerChar)) {
            results.punctuations += 1;
        } else {
            results.specialCharacters += 1;
        }
    }
    return results;
}

// num1 = principal, num2 = interest rate, num3 = years
const questionFour = function questionFour(num1, num2,num3) {
    // Implement question 4 here
    if (num3 === 0) {
        return 0;
    }

    let n = num3 * 12;              // number of months the loan takes on 
    let r = (num2 / 100) / 12;      // monthly interest rate
    let d = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let monthly = num1 * d;
    return Number(monthly.toFixed(2));
}

module.exports = {
    firstName: "Simon", 
    lastName: "Gao", 
    studentId: "10439402",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};