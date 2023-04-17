const inventoryModel=require("../model/inventory")

const createInventory=async(req,res)=>{
try {
        let data=req.body
        console.log(data);
        let {brandName,itemName,itemQuantity,organisationId}=data
        
        if(!brandName) return res.status(400).send({status:false,message:"please enter brand name"})
        if(!itemName) return res.status(400).send({status:false,message:"please enter item name"})
        if(!organisationId) return res.status(400).send({status:false,message:"please provide organisationId"})
        // if(typeof itemQuantity!=="number") return res.status(400).send({status:false,message:"please provide  quantity in number format"})
        if(!itemQuantity) return res.status(400).send({status:false,message:"please enter item quantity"})
        const createData=await inventoryModel.create(data)
        return res.status(200).send({status:true,message:createData})
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}


const getInventory=async(req,res)=>{
  try {
      let organisationId=req.decode.id
      const findData=await inventoryModel.find({organisationId:organisationId})
      if(!findData) return res.status(400).send({status:false,message:"no data found"})
      return res.status(200).send({status:true,message:findData})
  } catch (error) {
    return res.status(500).send({status:false, message:error.message})
  }
}
module.exports={createInventory,getInventory}






