// Promises have 3 states: pending, fufilled/resolves, or rejected

const weather = false;

// const date = new Promise((resolve, reject) => {
//     if (weather) {
//         const dateDetails = {
//             name: 'Cubana Restaurant',
//             location: '55th Street',
//             table: 5
//         };
//         resolve(dateDetails);
//     } else {
//         reject('Bad Weather so NO DATE! :(');
//     }
// });

function date() {
    if (weather) {
        const dateDetails = {
            name: 'Cubana Restaurant',
            location: '55th Street',
            table: 5
        };
        return Promise.resolve(dateDetails);
    } else {
        return Promise.reject('Bad Weather so NO DATE! :(');
    }
}

// date()
//     .then((dateDetails) => {
//         console.log('The promise resolved');
//         console.log(dateDetails);
//     }).catch((error) => {
//         console.log('The promise rejected');
//         console.log(error);
//     });

// const myDate1 = () => {
//     date()
//         .then((dateDetails) => {
//             console.log('The promise resolved');
//             console.log(dateDetails);
//         }).catch((error) => {
//             console.log('The promise rejected');
//             console.log(error);
//         });
// };

// myDate1();
// console.log('After myDate1 has been called');
// console.log('After myDate1 has been called2');
// console.log('After myDate1 has been called3');
// console.log('After myDate1 has been called4');
// console.log('After myDate1 has been called5');

const orderUber = (dateDetails) => {
    const message = `Get me an uber ASAP to ${dateDetails.location}, we are going on a date`;
    return Promise.resolve(message);
}

const myDate2 = () => {
    date()
        .then(orderUber)
        .then((message) => {
            console.log(message);
        }).catch((error) => {
            console.log(error);
        });
};

myDate2();
console.log('After myDate2 has been called');