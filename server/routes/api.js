const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Bike = require("../models/Bike");

/**
 * Utilty functions/middlewares
 */
const isLoggedIn = function(req, res, next) {
  if (!req.session.username) {
    return res.json({
      error: true,
      message: "No logged in user",
      data: null
    });
  }

  next();
};

const hasRentedBike = function(req, res, next) {
  if (!req.session.hasRentedBike) {
    return res.json({
      error: true,
      message: "User doesn't have a rented bike",
      data: null
    });
  }

  next();
};

const hasNoRentedBike = function(req, res, next) {
  if (req.session.hasRentedBike) {
    return res.json({
      error: true,
      message: "User have a rented bike already",
      data: null
    });
  }

  next();
};

function handleBikeNotFoundError(err) {
  res.status(404);
  return res.json({
    error: true,
    message: "Couldn't find the bike record",
    data: null
  });
}

/**
 * API routes
 */
router.get("/", (req, res) => {
  res.send("api works");
});

// Simulate login with a username
router.post("/login", (req, res) => {
  req.session.username = req.body.username;
  res.json({
    error: false,
    message: "User logged in",
    data: {
      username: req.session.username
    }
  });
});

// Simulate logout by clearing session
router.get("/logout", (req, res) => {
  delete req.session.username;
  delete req.session.hasRentedBike;
  res.json({
    error: false,
    message: "User logged out",
    data: null
  });
});

router.get("/bikes", (req, res) => {
  Bike.find((err, results) => {
    if (err) {
      res.status(400);
      return res.json({
        error: true,
        message: "Error loading bike records",
        data: null
      });
    }

    res.json({
      error: false,
      message: "List of bikes",
      data: results
    });
  });
});

router.post("/bike/new", (req, res) => {
  Bike.create(
    {
      username: "",
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      rented: false
    },
    (err, savedBike) => {
      if (err) res.json(err);

      res.json(savedBike);
    }
  );
});

router.post("/return-bike/:id", isLoggedIn, hasRentedBike, (req, res) => {
  const id = req.params.id;

  Bike.findById(id, (err, bike) => {
    if (err) handleBikeNotFoundError(err);

    if (bike && !bike.rented) {
      return res.json({
        error: true,
        message: "The bike is not rented yet",
        data: null
      });
    }

    // if rented, only then return
    if (bike && bike.rented) {
      const toSave = {
        username: req.session.username,
        latitude: req.body.latitude, // new location lat
        longitude: req.body.longitude, // new location long
        rented: false
      };

      Bike.findByIdAndUpdate(id, toSave, (err, savedBike) => {
        if (err) handleBikeNotFoundError(err);

        // add to session
        req.session.hasRentedBike = false;

        // TODO: sending old value instead of changed one
        res.json({
          error: false,
          message: "Bike was returned",
          data: savedBike
        });
      });
    }
  });
});

router.get("/rent-bike/:id", isLoggedIn, hasNoRentedBike, (req, res) => {
  const id = req.params.id;

  Bike.findById(id, (err, bike) => {
    if (err) handleBikeNotFoundError(err);

    if (bike && bike.rented) {
      res.json({
        message: "The bike is already rented",
        data: null
      });
    }

    // if not rented, only then rent
    if (bike && !bike.rented) {
      const toSave = {
        username: req.session.username,
        rented: true
      };

      Bike.findByIdAndUpdate(id, toSave, (err, savedBike) => {
        if (err) handleBikeNotFoundError(err);

        // add to session
        req.session.hasRentedBike = true;

        // TODO: sending old value instead of changed one
        res.json({
          error: false,
          message: "Bike was rented",
          data: savedBike
        });
      });
    }
  });
});

router.get("/bike/:id", (req, res) => {
  const id = req.params.id;

  Bike.findById(id, (err, bike) => {
    if (err) handleBikeNotFoundError(err);

    res.json({
      error: false,
      message: "Bike record found",
      data: bike
    });
  });
});

router.put("/bike/:id", (req, res) => {
  const id = req.params.id;
  const toSave = {
    username: req.body.username,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rented: req.body.rented
  };

  Bike.findByIdAndUpdate(id, toSave, (err, savedBike) => {
    if (err) handleBikeNotFoundError(err);

    res.json({
      error: false,
      message: "Bike record updated",
      data: savedBike
    });
  });
});

router.post("/user/new", (req, res) => {
  User.create(
    {
      name: req.body.name
    },
    (err, user) => {
      if (err) {
        res.status(400);
        res.json({
          error: true,
          message: "Error while creating new user",
          data: null
        });
      }

      res.json({
        error: false,
        message: "New user created",
        data: user
      });
    }
  );
});

module.exports = router;
