const router = require("express").Router();
const ImageBlocks = require("../models/ImageModel");

router.post("/add-images-block", async (req, res) => {
  // res.send("Hello");

  // console.log(req)

  // console.log("images");
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

module.exports = router;
