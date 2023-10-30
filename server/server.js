const express = require("express");
const cors = require("cors");

const PORT = 8080;

const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.get("/", (req, res) => {
  res.send("Hello, server is working fine, keep working");
});

// adding routes
const ImageRoutes = require("./routes/ImageBlockRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/image",ImageRoutes);

app.listen(PORT, () => {
  console.log(`Your server is working fine on ${PORT}, keep working`);
});
