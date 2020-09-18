const person = {
    first: 'Wes',
    last: 'Bos',
    country: 'Canada',
    city: 'Hamilton',
    twitter: '@wesbos'
};

const {first, city} = person;
console.log(first);
console.log(city);

function multiply(num1, num2) {
    return num1*num2;
}

console.log(multiply(5));

const myObj = {a: 1, b:2, c:3};
console.log(myObj);
myObj.d = "hello";
console.log(myObj);