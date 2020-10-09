const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const showList = await showData.getShows();
        res.json(showList);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
        const show = await showData.getShowById(req.params.id);
        res.json(show);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;