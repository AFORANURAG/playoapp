// all the request will go here 
const mongoose = require("mongoose");
const cron = require('node-cron');
const {Eventmodel} = require("./eventmodel")
// only users who has created the event can see the requests and their status etc
const  RequestSchema = mongoose.Schema({
// i will be using email as the unique criteria for finding or populating documents
description:{
type:String
},
event: {
    type: String,
    ref: 'Eventmodel'
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
// this cron job will check for each minute and will delete all the requests having 
// dates of past
// i will check it but lets write accept and reject logic.
cron.schedule('* * * * *', async () => {
const date = new Date();
const currentMoment = date.toISOString();

    const expiredRequests = await Request.find({
    createdAt: { $lt:currentMoment }
  }).populate('event');

  expiredRequests.forEach(async (request) => {
    const event = await Eventmodel.findById(request.event);
   // when the timing become past remove that request
    if (event.timings < currentMoment) {
      await request.remove();
    }
  });
});



module.exports = {RequestModel};