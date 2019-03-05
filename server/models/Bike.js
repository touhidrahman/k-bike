const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  username: String,
  latitude: Number,
  longitude: Number,
  rented: Boolean
}, {
  timestamps: true
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
