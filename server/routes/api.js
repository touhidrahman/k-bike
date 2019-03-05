const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Bike = require('../models/Bike');

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/bikes', (req, res) => {
  Bike.find((err, results) => {
    if (err) res.json(err);

    res.json(results);
  })
})

router.post('/bike/new', (req, res) => {
  Bike.create({
    username: '',
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rented: false,
  }, (err, savedBike) => {
    if (err) res.json(err);

    res.json(savedBike);
  });
});

router.get('/rent-bike/:id', (req, res) => {
  const id = req.params.id;

  Bike.findById(id, (err, bike) => {
    if (err) res.json(err);

    // if not rented, only then rent
    if (bike && !bike.rented) {
      const toSave = {
        username: req.body.username,
        rented: true
      }

      Bike.findByIdAndUpdate(id, toSave, (err, savedBike) => {
        if (err) res.json(err);

        // TODO: sending old value instead of changed one
        res.json(savedBike);
      })
    } else {
      // send error message
      res.end();
    }
  });
});

router.get('/return-bike/:id', (req, res) => {
  const id = req.params.id;

  Bike.findById(id, (err, bike) => {
    if (err) res.json(err);

    // if rented, only then return
    if (bike && bike.rented) {
      const toSave = {
        username: req.body.username,
        rented: false
      }

      Bike.findByIdAndUpdate(id, toSave, (err, savedBike) => {
        if (err) res.json(err);

        res.json(savedBike);
      })
    } else {
      // send error message
    }
  });
});

router.put('/bike/:id', (req, res) => {
  const id = req.params.id;
  const toSave = {
    username: req.body.username,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rented: req.body.rented
  }

  Bike.findByIdAndUpdate(id, toSave, (err, savedBike) => {
    if (err) res.json(err);

    res.json(savedBike);
  });
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
