const axios = require('axios');

async function getShowById(id) {
    if (!id || isNaN(id) || id.includes('.') || parseInt(id) <= 0) throw 'Id must be a positive whole number';
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    return data;
};

async function search(searchTerm) {
    if (!searchTerm) throw 'Search term required';
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    return data;
};

module.exports = {
    getShowById,
    search
};