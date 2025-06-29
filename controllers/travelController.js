const TravelPlan = require("../models/travelPlan.model");

const createTravelPlan = async (req, res) => {
  try {
    const travelplan = await TravelPlan.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "created travel plan successfully",
      data: travelplan,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Not created travel plan", err });
  }
};
const getMyTravelPlans = async (req, res) => {
  try {
    const travelplan = await TravelPlan.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      message: "created travel plan successfully",
      data: travelplan,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Not get travel plan", err });
  }
};
const deleteTravelPlan = async (req, res) => {
  try {
    const plan = await TravelPlan.findById(req.params.id);
    if (!plan || plan.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await TravelPlan.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Deleted travel plan successfully",
      data: travelplan,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "sever error", err });
  }
};

module.exports = { deleteTravelPlan, getMyTravelPlans, createTravelPlan };
