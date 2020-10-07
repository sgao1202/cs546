const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const me = {
            'name': 'Simon Gao',
            'cwid': '10439402',
            'biography': "I am a Junior (3/4) studying computer science at Stevens Institute of Technology.\nI am also a boomer now since I'm almost 21.",
            'favoriteShows': ['Game of Thrones', 'Crash Landing on You', 'Hospital Playlist', "Chef's Table", 'The Blacklist']
        };
        res.json(me);
    } catch (e) {
        res.status(404).send();
    }
});

module.exports = router;