const express = require("express");

const BikeController = require("../controllers/bike.controller");

const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("", BikeController.createBike);

router.get("/rent/:id", checkAuth, BikeController.rentBike);

router.post("/return/:id", checkAuth, BikeController.returnBike);

router.get("", BikeController.getBikes);

router.get("/my", checkAuth, BikeController.getBikeOfCurrentUser);

router.get("/:id", BikeController.getBike);

// should be a protected route, open for demo purpose
router.delete("/:id", BikeController.deleteBike);

module.exports = router;
