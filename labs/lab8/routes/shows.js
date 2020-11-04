const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (!id) {

    }
    try {
        const show = await showData.getShowById(id);
        let templateObj = {
            title: show.name,
            image: show.image,
            language: show.language,
            genres: show.genres,
            averageRating: "",
            network: "",
            summary: show.summary
        }
        if (show.rating) templateObj.averageRating = show.rating.average;
        if (show.network) templateObj.network = show.network.name;
        templateObj.summary = templateObj.summary.replace(/<[^>]*>/g, "");
        res.render('shows/single', templateObj);
    } catch (e) {
        res.status(404).render('shows/error', {error: e, title: "Error"});
    }
});

module.exports = router;