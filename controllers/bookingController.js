const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user.id });
    res
      .status(200)
      .json({
        success: true,
        message: "created booking successfully",
        data: booking,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed booking", err });
  }
};
const getUserBooking = async (req, res) => {
  try {
    const getBooking = await Booking.find({ user: req.user.id }).populate(
      "hotel"
    );
    res
      .status(200)
      .json({
        success: true,
        message: "get booking successfully",
        data: getBooking,
      });
  } catch (err) {
    res.status(500).json({ success: true, message: "Get Booking failed" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    booking.status = "cancelled";
    await booking.save();
    res
      .status(200)
      .json({
        success: true,
        message: "created booking successfully",
        data: booking,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: true, message: "created booking successfully" });
  }
};

module.exports = {createBooking, cancelBooking, getUserBooking}