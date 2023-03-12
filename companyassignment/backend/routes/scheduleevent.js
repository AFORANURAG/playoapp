const express = require("express");
const eventRouter = express.Router();
const {RequestModel} = require("../models/requestsmodel")
const {Eventmodel} = require("../models/eventmodel");
const {checkAccessToken} =require("../middlewares/tokenvalidator.js");

eventRouter.get("/",checkAccessToken,(req,res)=>{
    res.json({message:"welcome to the message router"});
})


eventRouter.post("/createevent",checkAccessToken,async (req,res)=>{
// the timings which are coming should be of future not from past , it is just 
// a edge case
    let {limit,timings,email,description}  = req.body;
// find the current date
//create a date object
// let date = new Date();
// // get the month
// let  month = (date.getMonth()+1).toString().padStart(2, '0');
// // take last two character of year
// let year = date.getFullYear().toString().substr(-2);
// let  day = date.getDate().toString().padStart(2, '0');
// let seconds  = date.getSeconds().toString().padStart(2, '0');

// const dateString = `${day}/${month}/${year}`;
// const timeString = date.toLocaleTimeString();
// const currentMoment = `${dateString} ${timeString}:${seconds}`;
// console.log(currentMoment);
// pad start just in case if the length is lesser than 2 , it will add 0 in front

//damn timing has to be a iso string date cause i will using isostring format in 
//chron jon
// timings will be in iso format
const date = new Date();
const currentMoment = date.toISOString();
// isostring format will come from frontend
if(typeof(limit)=="number"&&limit<=100&&limit>=1&&typeof(timings)=="string"&&timings>currentMoment){
try {
let event = new Eventmodel({limit,timings,email,description});
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

})
// all the logic of accepting a request or rejecting a request will be here

// first find all the events and requests assicated with them with its emailid of 
// creator , more importantly only the person who has created the event can see 
// request 

// find the requests with the creator emailid

eventRouter.get("/getrequest:email",checkAccessToken,async(req,res)=>{
 let email = req.body.email  
console.log(email)  
try {
const allrequests = await RequestModel.find({ event: email }).populate('event');
res.status(200).json(allrequests);
} catch (error) {
   console.log(`error while loading the request of event creator:${error}`) 
    res.status(500).json({message:"server error"})
}
})


// eventRouter.("/getrequest:email",async(req,res)=>{
//     let email = req.params.email   
//    try {
//    const allrequests = await RequestModel.find({ event: email }).populate('event');
//    res.status(200).json(allrequests);
//    } catch (error) {
//       console.log(`error while loading the request of event creator:${error}`) 
//        res.status(500).json({message:"server error"})
//    }
//    })
   




module.exports = {eventRouter};