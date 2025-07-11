const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);