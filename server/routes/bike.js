const express = require("express");

const BikeController = require("../controllers/bike.controller");

// const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

// router.post("", checkAuth, BikeController.createBike);

// router.put("/:id", checkAuth, BikeController.updateBike);

router.get("", BikeController.getBikes);

// router.get("/:id", BikeController.getBike);

// router.delete("/:id", checkAuth, BikeController.deleteBike);

module.exports = router;
