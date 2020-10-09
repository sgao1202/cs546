const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const me = {
            'name': 'Simon Gao',
            'cwid': '10439402',
            'biography': "I am a Junior (3/4) studying computer science at Stevens Institute of Technology. One of my non-major related learning interests is finance." +
                " I like to invest in stoinks and learn about the market which is why I started to take courses to count towards a Quantitative Finance minor." +
                " I think it's crazy that you can make more money by just investing into assets." + 
                " Another interest of mine is fitness and I've been working hard to change my physique over the past year but the pandemic had other plans." + 
                " On a more serious note, I'm from Toms River, New Jersey which is where I've lived for most of my life! Also, I am also a boomer now since I'm almost 21 :D.\n" + 
                " To make this seem more like a biography I shall talk about the life lessons I learned within the past year." +
                " One of the lessons I learned over the past year is to not let people into your life so easily because they might take advantage of you whether it be unintentionally or intentionally." +
                " Not to say that it applies to everyone, but always be cautious about who or what you put your time in." +
                " Then again, without going through these events I would have never been able to understand this concept." +
                " Well anyways, thank you for coming to my TED talk. I look forward to learning more in this course for the remainder of the semester!" + 
                " Also, how do you become a TA for this course because I genuinely love it so far.",
            'favoriteShows': ['Game of Thrones', 'Crash Landing on You', 'Hospital Playlist', "Chef's Table", 'The Blacklist']
        };
        res.json(me);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;