const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const SaleSchema=new mongoose.Schema({
  
    totalSale:{
        type:Number,
        require:true 
    },

    customerName:{
        type:String,
        require:true
    },
    customerNumber:{
        type:Number,
        require:true 
    },


    billAmount:{
        type:Number,
        require:true
    },

    paidAmount:{
        type:Number,

    },
    generatedDate:{
        type:String
    },
    organisationId: {
        type: ObjectId,
         ref: "user"
    },
},{timestamps:true})
module.exports=mongoose.model("saledata",SaleSchema)