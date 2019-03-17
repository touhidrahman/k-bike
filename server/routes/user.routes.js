const express = require("express");

const UserController = require("../controllers/user.controller");

const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("", UserController.getUsers);

router.post("", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/logout", checkAuth, UserController.userLogout);

module.exports = router;
