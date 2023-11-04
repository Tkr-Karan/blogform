const router = require("express").Router();
const PublishedBlocks = require("../models/PublishedModel");

router.post("/get-published", async (req, res) => {
  try {
    const newPublishedBlocks = new PublishedBlocks(req.body);

    console.log(req.body);

    await newPublishedBlocks.save();

    res.send({
      success: true,
      message: "Blocks published successfully",
    });
  } catch (error) {
    console.log(error);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/published-data", async (req, res) => {
  try {
    const publishedData = await PublishedBlocks.find();

    res.send({
      success: true,
      message: "data fetched successfully!!1",
      result: publishedData,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
