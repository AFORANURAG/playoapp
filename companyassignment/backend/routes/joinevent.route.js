const express = require("express");
const joinEventRouter = express.Router();
const { Eventmodel } = require("../models/eventmodel");
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
  let { emailOfEventCreator, emailOfJoinee} = req.body;
  if (emailOfEventCreator !== emailOfJoinee) {
    try {
      // just create a request with default status as peding
      let request = new RequestModel({ event:emailOfEventCreator,emailOfJoinee});
      // this would build a releation ship with the event and assoicated request
      await request.save();
      res.status(200).json({message:"request sent succesfully"});
    } catch (error) {
      console.log(`error in saving request in database :error is ${error}`);
      res.status(500).json({message:`error in saving request in database :error is ${error}`}); 
    }
  }
});

// now here is the join event logic

// only a person who created the event can the request status;
module.exports = {joinEventRouter}