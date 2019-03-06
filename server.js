// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');

// Get API routes
const api = require('./server/routes/api');

const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/k-bike-data');

app.use(session({
  secret: 'KaN1jByk3',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1209600000
  }, // two weeks in milliseconds
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true,
  })
}))

// Parsers for POST data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 'extended': 'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// error handlers
app.use(methodOverride())
app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
})
app.use(function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: 'Something failed!'
    });
  } else {
    next(err)
  }
});
app.use(function errorHandler(err, req, res, next) {
  res.status(500);
  res.json({
    error: err
  });
});

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
