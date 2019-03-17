// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get API routes
const bikeRoutes = require('./routes/bike.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose
  .connect('mongodb://commonuser:1unsafepass@ds247223.mlab.com:47223/k-bike-data')
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Database connection failed!");
  });

// Parsers for POST data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// Point static files
app.use(express.static(path.join(__dirname, 'assets')));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Set api routes
app.use('/api/bikes', bikeRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
