// use a closure for validating email.    
    function validateEmail(req,res,next)
    {
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(req.body.email.match(mailformat))
    {
    next()
    }
    else
    {
    res.status(401).json({message:"invalid email"});
    }
    } 

module.exports = {validateEmail};