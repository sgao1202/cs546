const axios = require('axios');
let shows = undefined;

async function getShows() {
    if (!shows) {
        const { data } = await axios.get('http://api.tvmaze.com/shows');
        shows = data;
    }
    return shows;
}

async function getShowById(id) {
    // Throw if the id argument does not exist, is not a number, is a float, or if the number <= 0
    if (!id || isNaN(id) || id.includes('.') || parseInt(id) <= 0) throw 'Id must be a positive whole number';

    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`).catch((error) => {
        // Custom error handling rather than returning the JSON object from axios.get
        throw `Show with id=${id} cannot be found`;
    });
    return data;
}

module.exports = {
    getShows,
    getShowById
};