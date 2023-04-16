const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const employeeSchema=new mongoose.Schema({
    staffName:{
        type:String,
        required:true
    },
    number :{
        type:Number,
        required:true
    },

    email :{
        type:String,
        required:true
    },
    dateOfJoining :{
        type:Date,
        required:true
    },
    salary :{
        type:Number,
        required:true
    },
    organisationId: {
        type: ObjectId,
         ref: "user"
     },
    image :{
        type:String,
        // required:true
    },
    department:{
        type:String,
        required:true
    }

},{timestamps:true})
module.exports=mongoose.model("employee",employeeSchema)