require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URL);
const connection = mongoose.connect(process.env.MONGO_URL);
module.exports = {connection};