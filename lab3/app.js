const people = require('./people');
const work = require('./work');

async function main() {
    // getPeople tests
    try {
        const peopleData = await people.getPeople();
        console.log('getPeople passed successfully');
    } catch (e) {
        console.log(e);
        console.log('getPeopled failed test case');
    }

    // getPersonById tests
    try {
        const person = await people.getPersonById(43);
        console.log('getPersonById passed successfully');
    } catch (e) {
        console.log(e);
        console.log('getPersonById failed test case');
    }

    try {
        const person2 = await people.getPersonById();
        console.log('getPersonById did not error');
    } catch (e) {
        console.log('getPersonById failed successfully');
    }

    // howManyPerState tests
    try {
        const count1 = await people.howManyPerState('NY')
        if (count1 === 64) {
            console.log('howManyPerState passed successfully');
        }
    } catch (e) {
        console.log(e);
        console.log('howManyPerState failed test case');
    }

    try {
        const count2 = await people.howManyPerState();
        console.log('howManyPerState did not error');
    } catch (e) {
        console.log('howManyPerState failed successfully');
    }

    // personByAge tests
    try {
        const age1 = await people.personByAge(0);
        console.log('personByAge passed successfully');
    } catch (e) {
        console.log(e);
        console.log('personByAge failed test case');
    }

    try {
        const age2 = await people.personByAge(-1);
        console.log('personByAge did not error');
    } catch (e) {
        console.log('personByAge failed successfully');
    }

    // peopleMetrics tests
    try {
        const metrics = await people.peopleMetrics();
        console.log('peopleMetrics passed successfully');
    } catch (e) {
        console.log(e);
        console.log('peopleMetrics failed test case');
    }

    // listEmployee tests
    try {
        const listEmp = await work.listEmployees();
        console.log('listEmployees passed successfully');
    } catch (e) {
        console.log('listEmployees failed test case');
    }

    // fourOneOne
    try {
        const four1 = await work.fourOneOne('240-144-7553');
        console.log('fourOneOne passed successfully');
    } catch (e) {
        console.log('fourOneOne failed test case');
    }

    try {
        const four2 = await work.fourOneOne(43);
        console.log('fourOneOne did not error');
    } catch (e) {
        console.log('fourOneOne failed successfully');
    }

    // whereDoTheyWork tests
    try {
        const where1 = await work.whereDoTheyWork('299-63-8866');
        console.log('whereDoTheyWork passed successfully');
    } catch (e) {
        console.log(e);
        console.log('whereDoTheyWork failed test case');
    }

    try {
        const where2 = await work.whereDoTheyWork('123456789');
        console.log('whereDoTheyWork did not error');
    } catch (e) {
        console.log('whereDoTheyWork failed successfully');
    }
}
main();