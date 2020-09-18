// console.log('Plant peas');

// setTimeout(() => {
//     console.log('Water Plant');
//     console.log("Maybe I'm another operation that depending on watering of the plant");
// }, 3000);

// console.log('Add fertilizer');

// setInterval(() => {
//     console.log('Hello');
// }, 1000);

const list = ['Man', 'Woman', 'Child'];
let newList = list.map((val) => {
    return val + 'kind';
});

newList.forEach((element) => {
    console.log(element);
});

function greeting(name) {
    console.log(`Hello ${name}, Welcome to CS-546!`);
}

function introduction(firstName, lastName, callback) {
    const fullName = `${firstName} ${lastName}`;
    callback(fullName);
}

introduction('Simon', 'Gao', greeting);

function study(subject, callback) {
    console.log(`I'm about to study ${subject}.`);
    callback(subject);
}

function afterStudy(subject) {
    console.log(`I'm done studying ${subject}, it's time to party!`);
}

study("Web Programming", afterStudy);
study("MongoDB", (subject) => {
    console.log(`I have studied too much ${subject} and I am tired`);
});