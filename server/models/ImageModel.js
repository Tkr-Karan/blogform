const mongoose = require("mongoose");

const ImageBlockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: [String],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ImageBlock", ImageBlockSchema);
