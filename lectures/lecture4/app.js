const dogs = require('./dogs');
const connection = require('./mongoConnection');

const main = async() => {
    const sasha = await dogs.addDog('Sashsa', ['Cheagle', 'Chihuahua', 'Beagle']);
    console.log('Sasha has been added, now she will blog');
    console.log(sasha);

    const db = await connection();
    await db.serverConfig.close();
    console.log('Finished');
};

main().catch((error) => {
    console.log(error);
});