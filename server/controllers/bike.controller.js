const Bike = require("../models/Bike");

/**
 * List all bikes
 */
exports.getBikes = (req, res, next) => {
  let fetchedBikes;

  Bike
    .find()
    .then(results => {
      fetchedBikes = results;
      return Bike.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Bikes fetched successfully!",
        data: fetchedBikes,
        count: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bikes failed!"
      });
    });
}

/**
 * Get bike by ID
 */
exports.getBike = (req, res, next) => {
  Bike.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        message: "Bike fetched successfully",
        data: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bike failed!",
        error: error,
      });
    });
}

/**
 * Get bike of current user
 */
exports.getBikeOfCurrentUser = (req, res, next) => {
  Bike.find({
      rentedBy: req.userData.userId
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Bike fetched successfully",
          data: result,
        });
      } else {
        res.status(200).json({
          message: "User doesn't have a rented bike",
          data: null,
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bike failed!",
        error: error,
      });
    });
}

/**
 * Create a new bike
 */
exports.createBike = (req, res, next) => {
  const toSave = {
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rented: false,
    rentedBy: null,
  };

  Bike.create(toSave)
    .then(savedBike => {
      res.json({
        message: "New bike created",
        data: savedBike
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: "Error creating new bike record",
      });
    });
}

/**
 * Delete a bike
 */
exports.deleteBike = (req, res, next) => {
  Bike.findByIdAndDelete(req.params.id)
    .then(result => {
      res.json({
        message: "Bike deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: "Error deleting bike record",
      });
    });
}

/**
 * Rent a bike
 */
exports.rentBike = (req, res, next) => {
  Bike.find({
      rentedBy: req.userData.userId
    })
    .then(result => {
      if (result.length > 0) {
        res.status(401).json({
          message: "User already has a rented bike",
          error: true
        });
      } else {
        const toUpdate = {
          rented: true,
          rentedBy: req.userData.userId,
        };

        Bike.findByIdAndUpdate(req.params.id, toUpdate)
          .then(result => {
            if (result) {
              res.status(200).json({
                message: 'Bike was rented',
                data: {
                  rentedBikeId: result._id
                }
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Bike couldn't be rented",
              error: error,
            });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Bike couldn't be rented",
        error: error,
      });
    });
}

/**
 * Return a bike
 */
exports.returnBike = (req, res, next) => {
  Bike.find({
      rentedBy: req.userData.userId
    })
    .then(result => {
      if (result.length === 0) {
        res.status(401).json({
          message: "User doesn't have a rented bike",
          error: true
        });
      } else {
        const toUpdate = {
          latitude: req.body.latitude, // new location lat
          longitude: req.body.longitude, // new location long
          rented: false,
          rentedBy: null,
        };

        Bike.findByIdAndUpdate(req.params.id, toUpdate)
          .then(result => {
            if (result) {
              res.status(200).json({
                message: 'Bike was returned',
                data: {
                  returnedBikeId: result._id
                }
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Bike couldn't be returned",
              error: error,
            });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Bike couldn't be returned",
        error: error,
      });
    });
}
