const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  location: { type: String, required: true, trim: true },
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  imageUrl: { type: String },
}, { timestamps: true })
hotelSchema.index({ name: 1, location: 1 }, { unique: true });
module.exports = mongoose.model('Hotel', hotelSchema);