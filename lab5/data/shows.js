const axios = require('axios');

async function getShows() {
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    return data;
}

async function getShowById(id) {
    if (isNaN(id) || parseInt(id) <= 0) throw 'Id must be a positive whole number';
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    if (data.status === 404) throw `Show with id=${id} cannot be found`;
    return data;
}

module.exports = {
    getShows,
    getShowById
};