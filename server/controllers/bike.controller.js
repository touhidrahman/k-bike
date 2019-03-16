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
      return Bike.count();
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
