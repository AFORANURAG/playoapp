const express = require("express");
const joinEventRouter = express.Router();
const { Eventmodel } = require("../models/requestsmodel");
const { RequestModel } = require("../models/requestsmodel");
const { checkAccessToken } = require("../middlewares/tokenvalidator");
// he can see all the events here

joinEventRouter.get("/", checkAccessToken, async (req, res) => {
  try {
    // get all events
    let allevents = await Eventmodel.find();
    res.json({ allevents });
  } catch (error) {
    console.log(`error in getting all the events:${error}`);
    res.json({ error: error });
  }
});

//get the request from frontend and and store it in the request collection basically

joinEventRouter.post("/createrequest", checkAccessToken,async (req, res) => {
  // so timings is coming from froentend and is equal to the timing of event  
  //userid is the id of creator and emailofjoinee is the email of joinee
let {userid, emailOfJoinee,email,timings} = req.body;
console.log(emailOfJoinee,userid)

// emailofjoineee come from frontend and email will come from
// guess what , you can't request more than once for a event and therefore check before
// making request
const  checkLimit = await Eventmodel.find({userid:userid,timings});
console.log(checkLimit);

let alreadyRequested = await RequestModel.find({emailOfJoinee,event:userid}); 
// console.log(alreadyRequested)
if(alreadyRequested.length==0){

  if(email!==emailOfJoinee&&checkLimit[0].limit<100){
    try {    
      console.log(`creator id is ${userid}`)
        // just create a request with default status as peding
        let request = new RequestModel({ event:userid,emailOfJoinee});
        // this would build a releation ship with the event and assoicated request
        await request.save();
        res.status(200).json({message:"request sent succesfully"});
      } catch (error) {
        console.log(`error in saving request in database :error is ${error}`);
        res.status(500).json({message:`error in saving request in database :error is ${error}`}); 
      }
  }else{
    res.json({message:"same person cannot join his own event"})
  }
}
else{
res.json({message:"you can't request more than once for an event"})
}


});


joinEventRouter.get("/allrequest",async(req,res)=>{
let {email} =req.body.email;
try {
  let allRequestMadeByTheUser = await RequestModel.find({emailOfJoinee: email})
res.json({allRequestMadeByTheUser});
} catch (error) {
  console.log(`error while loading the requests by the user:error is ${error}`);
res.status(500).json({message:"error while loading the requests"})
}
})




joinEventRouter.delete("/cancelrequest", async(req,res)=>{
// so canceling a request is basically just deleting the request from request collection;
// email or id both will work fine because
let requestId =req.body.requestid;

try {
let deleteRequest = await RequestModel.findByIdAndDelete({_id:requestId})
res.status(204).json({message:"deleted successfully"})
}
catch (error) {
  console.log(`error while canceling the request:error is ${error}`);
  res.status(500).json({message:"error while cancelling the request"})
}


})


// now here is the join event logic

// only a person who created the event can the request status;
module.exports = {joinEventRouter}