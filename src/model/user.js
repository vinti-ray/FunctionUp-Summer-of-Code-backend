const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    organisationName:{
        type:String,
        required:true
    },
    // lastname:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },


    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    profileImage:{
        type:String,
    }

    // confirmPassword:{
    //     type:String,
    //     required:true
    // }
},{timestamps:true})
module.exports=mongoose.model("user",userSchema)