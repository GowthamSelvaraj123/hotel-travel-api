const express = require("express");
const router = express.Router();
const {deleteTravelPlan, getMyTravelPlans, createTravelPlan} = require("../controllers/travelController");

router.post("/", createTravelPlan);
router.get("/my", getMyTravelPlans);
router.delete("/:id", deleteTravelPlan);

module.exports = router;