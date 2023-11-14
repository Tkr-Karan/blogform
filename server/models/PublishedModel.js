const mongoose = require("mongoose");

const publishedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    urls: {
      type: [String],
    },
    questionsData: {
      type: Object,
    },
    blockType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PublishedBlock", publishedSchema);
