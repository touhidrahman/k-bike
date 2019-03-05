const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Bike = require('../models/Bike');

router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/user/new', (req, res) => {
  User.create({
    name: req.body.name,
  }, (err, user) => {
    if (err) res.json(err);

    res.json(user);
  });
});

module.exports = router;
