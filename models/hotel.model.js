const mongoose = require("mongoose");

const Hotel = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  imageUrl: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Hotel', hotelSchema);