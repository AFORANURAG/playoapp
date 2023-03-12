const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    salt:{type:String,required:true}
})

const UserModel = mongoose.model("user",Userschema);

module.exports = {UserModel}