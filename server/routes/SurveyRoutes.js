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

module.exports = router;
