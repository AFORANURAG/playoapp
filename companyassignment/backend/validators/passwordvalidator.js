// middle ware for checking password strenght , it will proceed only strong password.
function CheckPassword(req,res,next) 
{ 
var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

if(req.body.password.match(decimal)) 
{ 
next()
}
else
{ 
res.status(401).json({message:"invalid password"});
}
} 

module.exports = {CheckPassword};