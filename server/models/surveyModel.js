const mongoose = require("mongoose");
// const { default: SurveyBlock } = require("../../client/src/Pages/SurveyBlock");

const SurveyBlockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questionsData: {
      type: Object,
    },
    blockType: {
      type: { type: String, default: "survey" },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SurveyModel", SurveyBlockSchema);
