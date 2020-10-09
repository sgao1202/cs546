const lab1 = require("./lab1");
//—————————————————————————————————————————————————————————————————————————
// Question 1 Test Cases

console.log(lab1.questionOne([10, 5, 2, 7, 9, 50, 100]));
// {10: false, 5: true, 2: true, 7: true, 50: false, 100: false}

console.log(lab1.questionOne([200, 50000, 237]));
// {200: false, 50000: false, 237: false}

console.log(lab1.questionOne([1, 0, -2]));
// {1: false, 0: false, -2:false}

console.log(lab1.questionOne([2, 6, 8, 15, 17]));
// {2: true, 6: false, 8: false, 15: false, 17: true}

console.log(lab1.questionOne([]));
// {}
//—————————————————————————————————————————————————————————————————————————
// Question 2 Test Cases

console.log(lab1.questionTwo([1,2,3]));
// 2744

console.log(lab1.questionTwo([500,100,200]));
// 27000000000000000

console.log(lab1.questionTwo([5]));
// 15625

console.log(lab1.questionTwo([25, 50, 75]));
// 669921875000

console.log(lab1.questionTwo([]))
// 0

//—————————————————————————————————————————————————————————————————————————
// Question 3 Test Cases

console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("Living in Spain but the 's' is silent!!"));
// {consonants: 18, vowels: 10, numbers: 0, spaces: 7, punctuations: 4, specialCharacters: 0}

console.log(lab1.questionThree("Living in saggin knee without the 's' :("));
// {consonants: 18, vowels: 11, numbers: 0, spaces: 7, punctuations: 4, specialCharacters: 0}

console.log(lab1.questionThree("Living with champagne but the 'cham' is silent!!@@@"));
// {consonants: 25, vowels: 12, numbers: 0, spaces: 7, punctuations: 4, specialCharacters: 3}

console.log(lab1.questionThree("I should of been an English major hehe XD!"));
// {consonants: 20, vowels: 13, numbers: 0, spaces: 8, punctuations: 1, specialCharacters: 0}

console.log(lab1.questionThree(""));
// {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

//—————————————————————————————————————————————————————————————————————————
// Question 4 Test Cases 

console.log(lab1.questionFour(25000, 3.11, 5)); 
// 450.44

console.log(lab1.questionFour(500, 1.11, 3));
// 14.13

console.log(lab1.questionFour(1, 3.11, 0));
// 0 

console.log(lab1.questionFour(0, 6.7, 7))
// 0 

console.log(lab1.questionFour(10000, 10, 5));
// 212.47