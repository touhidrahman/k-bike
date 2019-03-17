const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.createUser = (req, res, next) => {
  const user = new User({
    username: req.body.username,
  });

  user
    .save()
    .then(savedUser => {
      res.status(201).json({
        message: "User created!",
        data: savedUser
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!",
        error: true,
      });
    });
}

// Simulate user log in, no password required :)
exports.userLogin = (req, res, next) => {
  let fetchedUser;

  User.findOne({
      username: req.body.username
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "The user doesn't exist",
          error: true,
        });
      }

      fetchedUser = user;

      const token = jwt.sign({
          username: fetchedUser.username,
          userId: fetchedUser._id
        },
        "token_secret_should_be_in_env", // TODO: Move to dot-env file
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        message: 'User logged in',
        data: {
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        }
      });
    })
    .catch(err => {
      return res.status(401).json({
        error: true,
        message: "Invalid authentication credentials!"
      });
    });
}

/**
 * Get all users (convenience method)
 */
exports.getUsers = (req, res, next) => {
  User.find()
    .then(result => {
      res.status(200).json({
        message: "Fetched all users successfully",
        data: result,
      });
    })
}

/**
 * Logout
 */
exports.userLogout = (req, res, next) => {
  delete req.userData;
  res.status(200).json({
    message: "User logged out"
  });
}
