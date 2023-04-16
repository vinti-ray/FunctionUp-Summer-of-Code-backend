const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const inventorySchema=new mongoose.Schema({
    brandName:{
        type:String,
        required:true
    },
    itemName :{
        type:String,
        required:true
    },

    itemQuantity :{
        type:Number,
        required:true
    },
    organisationId: {
        type: ObjectId,
         ref: "user"
    },

},{timestamps:true})
module.exports=mongoose.model("inventory",inventorySchema)