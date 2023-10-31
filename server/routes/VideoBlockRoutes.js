const router = require("express").Router();
const VideoBlock = require("../models/videoModel");

router.post("/add-video-block", async (req, res) => {
  // res.send("Hello");

  // console.log(req)

  // console.log("images");
  try {
    const newVideoBlocks = new VideoBlock(req.body);

    console.log(req.body);

    await newVideoBlocks.save();
    res.send({
      success: true,
      message: "Video Block Added Successfully!!",
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
