const mongoose = require("mongoose");
const validator = require("validator");
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:false,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email Invalid...!");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:false,
        min:10
    },
    message:{
        type:String,
        required:true

    }
    

})
const User = mongoose.model("User",userschema);
module.exports=User;





