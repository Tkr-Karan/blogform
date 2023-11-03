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
    blockType: {
      type: {type: String ,default: "image"},
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ImageBlock", ImageBlockSchema);
