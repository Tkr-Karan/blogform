const express = require('express');

const PORT  = 8080;

const app = express()

require("dotenv").config();
const dbConfig = require('./config/dbConfig')

app.get("/", (req, res) => {
    res.send("Hello, server is working fine, keep working")
})

app.listen(PORT, () => {
    console.log(`Your server is working fine on ${PORT}, keep working`)
})