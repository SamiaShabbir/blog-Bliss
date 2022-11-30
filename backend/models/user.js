const mongoose = require("mongoose");
const Userschema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        length:8
    },
    profilepic:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:"basic",
        required:true
    },
    about:{
        type:String,
        required:false,
    }
},{ timestamps:true}
);
const User=mongoose.model("user",Userschema);
module.exports= User;
