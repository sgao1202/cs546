const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.post('/', async (req, res) => {
    let searchTerm = req.body.searchTerm.trim();
    if (!searchTerm) {
        res.status(400).render('shows/error', {error: "Search term cannot be empty/blank", title:"Error"});
        return;
    }
    let templateObj = {
        title: "Shows Found", 
        searchTerm: searchTerm, 
    };
    try {
        const results = await showData.search(searchTerm);
        templateObj.hasResults = (results.length > 0);
        templateObj.results = results.slice(0,20);
        res.render('shows/results', templateObj);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e});
    }
});

module.exports = router;