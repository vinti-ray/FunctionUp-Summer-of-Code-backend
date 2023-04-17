const saleModel=require("../model/totalSaleModel")
const billinModel=require("../model/billing")
// const { find } = require("../model/user")
// const { json } = require("express")
// //    For using datatable first create API which return all bill details which belongs to this organization
//    a). Total sale ( total sale day wise)
// b). Customer Name 
// c). Customer Number 
// d). Bill amount 
// e). Paid amount
// f). Generated date
const getSaleData=async(req,res)=>{
  try {
      let organisationId=req.decode.id
      const findData=await billinModel.find({organisationId:organisationId}).lean()
      if(findData.length==0) return res.status(404).send({status:false,message:"no data found"})
  
    let finalData=[]
    let indicesToRemove = [];
    for(let i=0;i<findData.length;i++){
       if(indicesToRemove.includes(i)){
          continue
       }
      // let x=findData[i].item
  
      // let totalSale=x.reduce((acc,curr)=>acc+curr.quantity,0)
      let totalSale=0
  
      let billAmount=0
      let paidAmount=0
      let x=findData[i].createdAt
          const dateObj = new Date(x);
          const y = dateObj.toISOString().slice(0, 10);
          let generatedDate=y
  
  
  
      for(let j=i;j<findData.length;j++){
          
          if (indicesToRemove.includes(j)) {
              continue;
          }
          let date=findData[j].createdAt
          const dateObj = new Date(date);
          const p = dateObj.toISOString().slice(0, 10);
  
          if(p==generatedDate){
  
              // let x=findData[j].item
              // console.log(x);
  
              // let sale=x.reduce((acc,curr)=>acc+curr.quantity,0)
              totalSale+=1
              billAmount+=findData[j].total
              paidAmount+=findData[j].netTotal
            indicesToRemove.push(j)
            }
      }
      let obj={}
      obj.totalSale=totalSale
  
  
      obj.billAmount=billAmount.toFixed(2)
      obj.paidAmount=paidAmount.toFixed(2)
      obj.generatedDate=generatedDate
      finalData.push(obj)
      // obj={}
      }
  //    console.log(finalData);
       return res.status(200).send({status:true,message:finalData})
  } catch (error) {
    return res.status(500).send({status:false, message:error.message})
  }

}
module.exports={getSaleData}
//findData is an array  inside that item is an array  collect all the customer with same mobile no and name

