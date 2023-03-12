const {RequestModel,Eventmodel} =require("./requestsmodel");
const cron = require('node-cron');
const moment = require('moment');

async function deleteExpiredRequests() {
    const date = new Date;
    const now = moment().toISOString();
  
    // Find all events whose timings have already been passed.
// so basically what i am doing here i am trying to find all of those events having 
// timings (iso) date of past 


// currentisodata > pastisodate-->(true)

    const allExpiredEvents = await Eventmodel.find({ timings: { $lt: now } });
  
    // Delete all requests associated with expired events.
    for (const event of allExpiredEvents) {
      await RequestModel.deleteMany({ event: event.userid });
    }
  }
  
  cron.schedule('* * * * *', async () => {
    console.log('clean up is happening');
    await deleteExpiredRequests();
  });


