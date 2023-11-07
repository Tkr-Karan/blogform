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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AnalyticsModel", AnalyticSchema);
