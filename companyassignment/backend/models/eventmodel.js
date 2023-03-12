const mongoose = require("mongoose");

const Eventschema = mongoose.Schema({
   limit:{type:Number},
   timings:{type:String},
   email:{type:String},
   description:{type:String},
})

const Eventmodel = mongoose.model("event",Eventschema);

module.exports = {Eventmodel};