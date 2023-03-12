// all the request will go here 
const mongoose = require("mongoose");
const { Schema } = mongoose;

const Eventschema = mongoose.Schema({
   limit:{type:Number},
   timings:{type:String},
   email:{type:String},
   description:{type:String},
   userid:{type:mongoose.Schema.Types.ObjectId},
})

const Eventmodel = mongoose.model("events",Eventschema);


// only users who has created the event can see the requests and their status etc
const  RequestSchema = mongoose.Schema({
// i will be using email as the unique criteria for finding or populating documents
description:{
type:String
},
event: {
    type: Schema.Types.ObjectId,
    ref: Eventmodel
  },
status: {
  type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
  ,
emailOfJoinee:{type:String},

},{ timestamps: true })
// timestamps for crated at field
const RequestModel = mongoose.model("request",RequestSchema);

module.exports = {RequestModel,Eventmodel};