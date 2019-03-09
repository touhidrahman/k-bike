const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  rented: Boolean
}, {
  timestamps: true
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
