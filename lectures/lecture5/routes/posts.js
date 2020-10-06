const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;

router.get('/', async (req, res) => {
    try {
        const postList = await postData.getAllPosts();
        res.json(postList);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
      const post = await postData.getPostById(req.params.id);
      res.json(post);
    } catch (e) {
      res.status(404).send();
    }
  });
  
  router.post('/', async (req, res) => {
    // not implemented
    res.status(200).send();
  });

  module.exports = router;