const mongoose = require("mongoose");

const VideoBlockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("VideoBlock", VideoBlockSchema);
