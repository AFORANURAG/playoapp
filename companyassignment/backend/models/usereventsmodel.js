// this model will determine the events with which a user is associated to 
// every
const mongoose = require("mongoose");

const Eventschema = mongoose.Schema({
   limit:{type:Number},
   timings:{type:String}
})

const UserModel = mongoose.model("event",Eventschema);

module.exports = {UserModel}