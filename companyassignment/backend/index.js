require("dotenv").config();
const express = require("express");
const app = express();
const {RequestModel,Eventmodel} =require("./models/requestsmodel");
const cron = require('node-cron');
const moment = require('moment');


const {Authrouter} = require("./routes/authentication.route")
const {connection} =require("./config/db.config");
const {eventRouter} = require("./routes/scheduleevent.js");
const {joinEventRouter}  = require("./routes/joinevent.route")


app.use(express.json())
app.use("/authentication",Authrouter);
app.use("/eventschedule",eventRouter);
app.use("/joinevent",joinEventRouter);

// the work of chron job is to remove the request assoicitated 
async function deleteExpiredRequests() {
    
    const now = moment().toISOString();
  
    // Find all events whose timings have already been passed.
// so basically what i am doing here i am trying to find all of those events having 
// timings (iso) date of past 


// currentisodata > pastisodate-->(true)

const allExpiredEvents = await Eventmodel.find({ timings: { $lt: now } });
// Delete all requests associated with expired events.
console.log(allExpiredEvents)
for (const el of allExpiredEvents) {
await RequestModel.deleteMany({ event: el.userid.toString(),status:"pending"}).populate("event");
}
}
  
  cron.schedule('* * * * *', async () => {
    console.log('clean up is happening');
    await deleteExpiredRequests();
  });





app.get("/",(req,res)=>{
    res.send("hello from base route");
})

app.listen(process.env.PORT,async()=>{
try {
    await connection;
    console.log(`connected to database successfully`);
console.log(`server listening at port  ${process.env.PORT}`)
} catch (error) {
    console.log(`error in connecting to the database`,`error is ${error}`);
}

})