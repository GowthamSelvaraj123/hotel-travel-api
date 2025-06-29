const express = require("express");
const router = express.Router();
const {createHotel, getHotels, getHotelsById, updateHotel, deleteHotel, } = require("../controllers/hotelController")

router.post("/", createHotel);
router.get("/", getHotels);
router.get("/:id", getHotelsById);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

module.exports = router;