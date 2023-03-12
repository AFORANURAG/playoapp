const {client} =  require("../routes/authentication.route");
const jwt = require("jsonwebtoken");
// client.sIsMember
// console.log(client)
// using redis for logout and blacklisting
function checkAccessToken(req,res,next){
let accessToken = req?.headers?.authorization?.split(" ")[1];
// console.log(accessToken);
if(accessToken){
    client.sIsMember('blacklist', accessToken, (err, result) => {
        if (err) {
          console.error(`error while loading blacklisted tokens`,err);
         return  res.status(500).json({message:"server error"})
        }
    if(result) {
        console.log(result);
        res.status(401).json({message:"your are logged.please login again"})
    }
    }
    )  
    // decode the token 
    try{
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                console.error(`error while verifying the accesstoken`,err);
                 return  res.status(500).json({message:"server error"})  
            }
            console.log(decoded);
            req.body.email = decoded.email,
            req.body.id = decoded.id
            next();
            })  
    }
    catch(err){
     console.log(err);
     res.status(500).json({message:"error comparing the token",err})   
    }
}
else{
res.status(401).json({message:"invalid token"})
}
// check this if this token is there in the list of blacklisted token or not
}

module.exports  = {checkAccessToken};