const express = require("express");
const eventRouter = express.Router();
const {RequestModel} = require("../models/requestsmodel")
const {Eventmodel} = require("../models/requestsmodel");
const {checkAccessToken} =require("../middlewares/tokenvalidator.js");

eventRouter.get("/",checkAccessToken,(req,res)=>{
    res.json({message:"welcome to the message router"});
})




// route for creating an event

eventRouter.post("/createevent",checkAccessToken,async (req,res)=>{
// the timings which are coming should be of future not from past , it is just 
// a edge case
    let {limit,timings,email,description,id}  = req.body;
// console.log(limit,timings,email,description)
console.log(`id of creator is ${id}`);

// find the current date
//create a date object
// let date = new Date();
// // get the month
// let  month = (date.getMonth()+1).toString().padStart(2, '0');
// // take last two character of year
// let year = date.getFullYear().toString().substr(-2);
// let  day = date.getDate().toString().padStart(2, '0');
// let seconds  = date.getSeconds().toString().padStart(2, '0');

// let dateString = `${day}/${month}/${year}`;
// let timeString = date.toLocaleTimeString();
// let  currentMoment = `${dateString} ${timeString}:${seconds}`;
// console.log(currentMoment);
// pad start just in case if the length is lesser than 2 , it will add 0 in front

//damn timing has to be a iso string date cause i will using isostring format in 
//chron jon
// timings will be in iso format


const isEventAlreadyPresent =await  Eventmodel.find({timings})
console.log(isEventAlreadyPresent);
if(isEventAlreadyPresent.length==0){
    const date = new Date();
    const currentMoment = date.toISOString();
    // isostring format will come from frontend
    if(typeof(limit)=="number"&&limit<=100&&limit>=1&&typeof(timings)=="string"&&timings>currentMoment){
    try {
    let event = new Eventmodel({limit,timings,email,description,userid:id});
    await event.save();
    res.status(201).json({message:"event created successfully"});   
    }
    catch (error) {
    console.log(`error in saving the event: ${error.message}`);
    res.status(500).json({message:"server error"})    
    }   
    }else{
    res.status(400).json({message:"invalid data, the date or limit is invalid"})
    }
}else
{
res.status(400).json({message:"A user is not allowed to create same event twice"})   
}
})


// all the logic of accepting a request or rejecting a request will be here
// first find all the events and requests assicated with them with its userid of 
// creator , more importantly only the person who has created the event can see 
// requests 


eventRouter.get("/getrequest",checkAccessToken,async(req,res)=>{
 let creatorid = req.body.id ;
// so basically we the creatorid is the id coming from jwt and we are fecthing out 
// the request that has been created for the events
console.log(`creator id is ${creatorid}`);
try {
const allrequests = await RequestModel.find({ event: creatorid }).populate('event');
res.status(200).json(allrequests);
} catch (error) {
   console.log(`error while loading the request of event creator:${error}`) 
    res.status(500).json({message:"server error"})
}
})

// this is the route for accepting and rejecting the request


eventRouter.patch("/updatestatus",checkAccessToken,async(req,res)=>{
    let id =req.body.id;
    let {newstatus,requestid} = req.body ;
//  each request by default will have request id

   // so basically we the creatorid is the id coming from jwt and we are fecthing out 
   // the request that has been created for the events
   console.log(`creator id is ${id}`);
   try {
   const allrequests = await RequestModel.findOneAndUpdate({event:id,_id:requestid},{ status: newstatus }).populate('event');
   res.status(204).json({message:"status updated successfully"});
   } catch (error) {
      console.log(`error while changing the status of request:${error}`) 
       res.status(500).json({message:"server error"})
   }
   })

module.exports = {eventRouter};