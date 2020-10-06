const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/', async (req, res) => {
  try {
    const userList = await userData.getAllUsers();
    res.json(userList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userData.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).send();
  }
});

router.post('/', async (req, res) => {
  // not implemented
  res.status(200).send();
});
module.exports = router;