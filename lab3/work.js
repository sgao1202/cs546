const axios = require('axios');
const people = require('./people');

async function getWork() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

async function listEmployees() {
    const work = await getWork();
    const companyList = [];
    for (const company of work) {
        let companyObj = {};
        let employees = [];
        for (const id of company.employees) {
            const person = await people.getPersonById(id);
            const employeeObject = {
                first_name: person.first_name,
                last_name: person.last_name
            };
            employees.push(employeeObject);
        }
        companyObj.company_name = company.company_name;
        companyObj.employees = employees;
        companyList.push(companyObj);
    }
    return companyList;
}

function checkFormat(phoneNumber, format) {
    const pn = phoneNumber.trim();
    // const format = "###-###-####";
    const numbers = '0123456789';
    if (pn.length !== format.length) return false;
    for (let i = 0; i < format.length; i++) {
        if ((format[i] === '-' && pn[i] !== '-' ) || (format[i] !== '-' && !numbers.includes(pn[i]))) return false;
    }
    return true;
}

async function fourOneOne(phoneNumber) {
    if (!phoneNumber) throw 'Phone number parameter must be given';
    if (typeof phoneNumber !== 'string') throw 'Phone number must be a string';
    if (!checkFormat(phoneNumber, "###-###-####")) throw 'Phone number is not in correct format (###-###-####)';
    
    const work = await getWork();
    for (const company of work) {
        if (company.company_phone === phoneNumber) return {
            company_name: company.company_name,
            company_address: company.company_address
        };
    }
    throw 'Company cannot be found';
}

async function whereDoTheyWork(ssn) {
    if (!ssn) throw 'SSN parameter must be given';
    if (typeof ssn !== 'string') throw 'SSN must be a string';
    if (!checkFormat(ssn, "###-##-####")) throw 'SSN is not in the correct format';

    const persons = await people.getPeople();
    const person = persons.find(p => {
        return p.ssn === ssn
    });

    // Person w/ ssn is not found 
    if (!person) throw `No one exists with an SSN of ${ssn}`;

    const work = await getWork();
    const employeeId = person.id
    const company = work.find( c => {
        return c.employees.includes(employeeId);
    });
    return `${person.first_name} ${person.last_name} works at ${company.company_name}.`;
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
};