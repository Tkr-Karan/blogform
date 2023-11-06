const router = require("express").Router();
const Analytics = require("../models/AnalyticsModel");

router.post("/test-anlytics", async (req, res) => {
  try {
    const newAnalytics = new Analytics(req.body);

    console.log(req.body);

    await newAnalytics.save();
    res.send({
      success: true,
      message: "test submit Successfully!!",
    });
  } catch (error) {
    console.log(error);

    res.send({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;