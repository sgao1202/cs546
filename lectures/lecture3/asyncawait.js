// async function myRide() {
//     return '2017 Merecedes-Benz GLE';
// }

// function myRide() {
//     return Promise.resolve('2017 Merecedes-Benz GLE');
// }

// function foo() {
//     return Promise.reject(25);
// }

// async function foo2() {
//     throw 25;
// }

const weather = true;
async function date() {
    if (weather) {
        const dateDetails = {
            name: 'Cubana Restaurant',
            location: '55th Street',
            table: 5
        };
        return dateDetails;
    } else {
        throw 'Bad weather so no date!';
    }
}

const orderUber = async (dateDetails) => {
    const message = `Get me an uber ASAP to ${dateDetails.location}, we are going on a date`;
    return message;
};

async function myDate() {
    try {
        let dateDetails = await date();     // If dateDetails fails then it throws an error and then gets caught in the catch clause
        let message = await orderUber(dateDetails);
        console.log(message);
    } catch (e) {
        console.log(e);
    }
}

myDate();
console.log("hello world");