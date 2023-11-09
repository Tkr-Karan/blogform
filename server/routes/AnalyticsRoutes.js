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

router.get("/get-analytics-data", async (req, res) => {
  try {
    const AnalyticsData = await Analytics.find();
    res.send({
      success: true,
      message: "Analytics data fetched successfully",
      data: AnalyticsData,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get("/get-analytics-data/:id", async (req, res) => {
  try {
    const blockID = req.params.id;
    const blockData = await Analytics.findById(blockID);
    // console.log("blockData ---> ", blockData);
    res.send({
      success: true,
      message: "analytics block fetched by it ID :)",
      data: blockData,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
