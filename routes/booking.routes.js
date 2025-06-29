const express = require("express")
const router = express.Router();
const {createBooking, cancelBooking, getUserBooking} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/my", getUserBooking);
router.put("/cancel/:id", cancelBooking);

module.exports = router;