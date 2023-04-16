const employeeModel=require("../model/employSchema")
const {uploadFile}=require("../aws/aws")

const createEmployee=async(req,res)=>{
try {
      let data=req.body
      console.log(data);
      let {   staffName,  number,email,organisationId,  dateOfJoining, salary, department  } =data
      let files=req.files
      console.log(files);
    if(!staffName) return res.status(400).send({status:false,message:"please upload staff name"})
    if(!number) return res.status(400).send({status:false,message:"please upload staff number"})
    if(!email) return res.status(400).send({status:false,message:"please upload staff email"})
    if(!dateOfJoining) return res.status(400).send({status:false,message:"please upload staff dateOfJoining"})
    if(!salary) return res.status(400).send({status:false,message:"please upload staff salary"})
    if(!organisationId) return res.status(400).send({status:false,message:"please provide organisationId"})
    if(!department) return res.status(400).send({status:false,message:"please upload staff department"})
      // if (files&&files.length!=0) {
      //     data.image=files
      // }
  
      if (Object.keys(req.body).length == 0) 
          return res.status(400).send({ status: false, message: "Please Enter data in body" })
      // console.log(image);
  
  //    if(files&&files.length>0){
      let uploadFileUrl=await uploadFile(files[0])
      data.image=uploadFileUrl
    //  }else{
    //      return res.status(400).send({status:false,message:"please upload image"})
    //   }
      
     const createData=await employeeModel.create(data)
     return res.status(201).send({status:true,message:createData})
} catch (error) { 
  return res.status(500).send({status:false, message:error.message})
}

}





const getEmployee=async(req,res)=>{
let organisationId=req.decode.id

  const findData=await employeeModel.find({organisationId:organisationId}).lean()

  if(!findData)  return res.status(500).send({status:false, message:"no data available"})

  return res.status(201).send({status:true,message:findData})

}
module.exports={createEmployee,getEmployee}