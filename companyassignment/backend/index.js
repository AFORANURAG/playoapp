require("dotenv").config();
const express = require("express");
const app = express();
const {Authrouter} = require("./routes/authentication.route")
const {connection} =require("./config/db.config");
const {eventRouter} = require("./routes/scheduleevent.js");
const {joinEventRouter}  = require("./routes/joinevent.route")


app.use(express.json())
app.use("/authentication",Authrouter);
app.use("/eventschedule",eventRouter);
app.use("/joinevent",joinEventRouter);


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