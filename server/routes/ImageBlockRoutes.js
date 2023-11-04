const router = require("express").Router();
const ImageBlocks = require("../models/ImageModel");

router.post("/add-images-block", async (req, res) => {
  try {
    const newImageBlock = new ImageBlocks(req.body);

    console.log(req.body);

    await newImageBlock.save();
    res.send({
      success: true,
      message: "Image Block Added Successfully!!",
    });
  } catch (error) {
    console.log(error);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-image-block-data", async (req, res) => {
  try {
    const imageBlocks = await ImageBlocks.find();
    res.send({
      success: true,
      message: "images block fetched successfully",
      data: imageBlocks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
