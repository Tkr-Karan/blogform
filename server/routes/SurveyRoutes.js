const router = require("express").Router();
const SurveyBlock = require("../models/SurveyModel");

router.post("/survey-blocks", async (req, res) => {
  try {
    const newSurvey = new SurveyBlock(req.body);

    await newSurvey.save();

    res.send({
      success: true,
      message: "survey Block added successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-survey-block-data", async (req, res) => {
  try {
    const SurveyData = await SurveyBlock.find();
    res.send({
      success: true,
      message: "Survey Block data fetched successfully",
      data: SurveyData,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
