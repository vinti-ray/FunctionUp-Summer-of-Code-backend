const inventoryModel=require("../model/inventory")

const createInventory=async(req,res)=>{
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
}


const getInventory=async(req,res)=>{
    let organisationId=req.decode.id
    const findData=await inventoryModel.find({organisationId:organisationId})
    if(!findData) return res.status(400).send({status:false,message:"no data found"})
    return res.status(200).send({status:true,message:findData})
}
module.exports={createInventory,getInventory}






