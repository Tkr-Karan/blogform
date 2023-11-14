const mongoose = require("mongoose");

const AnalyticSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    urls: {
      type: [String],
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    blockType: {
      type: String,
    },
    surveyResponses: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AnalyticsModel", AnalyticSchema);
