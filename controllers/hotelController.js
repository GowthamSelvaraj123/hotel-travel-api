const Hotel = require("../models/hotel.model");

const createHotel = async (req, res) => {
  try {
    const { name, location, description, pricePerNight, rating, imageUrl } =
      req.body;
    if (!name || !location || !description || !pricePerNight || !rating) {
      return res
        .status(200)
        .json({ success: true, message: "These fields are required" });
    }
    const existingHotel = await Hotel.findOne({
      name: name.trim(),
      location: location.trim(),
    });
    if (existingHotel) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Hotel with this name and location already exists",
        });
    }
    const hotel = new Hotel.creae({
      name: name.trim(),
      location: location.trim(),
      description,
      pricePerNight,
      rating,
      imageUrl,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Created Hotel successfully",
        data: hotel,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      res.status(400).json({ success: false, message: "Hotel not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Get Hotel successfully", data: hotels });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
const getHotelsById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.parms.id);
    if (!hotel) {
      res.status(400).json({ success: false, message: "Hotel not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Get Hotel successfully", data: hotel });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) {
      res.status(400).json({ success: false, message: "Hotel not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Updated Hotel successfully",
        data: hotel,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        success: true,
        message: "Delted Hotel successfully",
        data: hotel,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotelsById,
  updateHotel,
  deleteHotel,
};
