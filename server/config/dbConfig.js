const mongoose = require('mongoose');

mongoose.connect(process.env.mongoDb_url)

const connection = mongoose.connection;


connection.on("connected", () => {
    console.log("Connection established successfully!!")
})




// mongoose.connect(MongoDB).then(() => {
//     console.log("Connection established successfully!!");
// }).catch((err) => {
//     console.log(err);
// })