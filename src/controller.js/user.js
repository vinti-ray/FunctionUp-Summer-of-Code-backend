const userModel=require("../model/user")
const employeeModel=require("../model/employSchema")
const {uploadFile}=require("../aws/aws")
const bcrypt=require("bcrypt")
 let jwt=require('jsonwebtoken') 
 const saltRounds = 10;     



//__________________________ Validations : Email  ___________________________________________

const isValidEmail = function (email) {
    const emailRegex = 
    /[a-zA-Z_1-90]{3,}@[A-za-z]{3,}[.]{1}[a-zA-Z]{2,}/;
    return emailRegex.test(email);
};

//__________________________ Validations : Password  ___________________________________________

const isValidPassword = function (password) {
    const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordRegex.test(password);
}; 

const createData = async function (req, res) {
try {
	  let data = req.body;

	  if(!data) return res.status(400).send({status:false, message: "body is mandatory" });
	
	  let {organisationName, password,email }=data
     //fname
	  if (!organisationName) return res.status(400).send({ status:false, message: "fname is mandatory" });
	  
    //  lname
	//   if (!lastname) return res.status(400).send({status:false, message: "Last name is required " });
	  
    //   email

	  
	  if (!email) return res.status(400).send({status:false, message: " email is required " });
	  if(!isValidEmail(email))  return res.status(400).send({status:false, message:"invalid email"})
	  const isEmailUnique= await userModel.findOne({email:email})
	  if(isEmailUnique)   return res.status(400).send({status:false, message:"email is already used"})


	  //password
	  if (!data.password) return res.status(400).send({ status:false, message: " password is required " });

	  if (!isValidPassword(password))
	    return res.status(404).send({ status:false, message: "password  should contain Min 8 character and 1 Special Symbol" });
	 
 
        //hash
         password=password.trim()
	
        let encryptPassword =await bcrypt.hash(password, saltRounds)
        
        data.password=encryptPassword
	  //createAuthor
	
	  const createUser = await userModel.create(data);
	  return res.status(201).send({status:true,message: "User created Successfully",data:createUser})
} catch (error) {
	return res.status(500).send({status:false,message:error.message})
}
}




const login=async function(req,res) {
try {
	  let email=req.body.email
	  let password=req.body.password
	  console.log(email);
	  let data=req.body
	  if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "please provide author details" });

	
	  if(!email)  return res.status(400).send({status:false, message:"email is required"})
	 
	  if(!password)  return res.status(400).send({status:false, message:"password is required"})
    //   if(!confirmPassword)  return res.status(400).send({status:false, message:"confirmPassword is required"})
	  const findData=await userModel.findOne({email:email})
	
	  if (!findData)  return res.status(401).send({ status: false, message: "invalid email" });
   
      const decodePassword = await bcrypt.compare(password, findData.password)
      if(!decodePassword) return res.status(400).send({ status: false, message: "invalid password" })
	 
	
	//token
	
	  const createToken=jwt.sign({id:findData._id.toString(),name:findData.organisationName},"new_seceret_key")
	
	  res.header("token",createToken)
	
	  res.status(201).send({status:true, message:createToken})
} catch (error) {
	return res.status(500).send({status:false, message:error.message})
}
} 

const getUser=async(req,res)=>{
try {
	    let organisationId=req.decode.id
		const  findData=await userModel.findById(organisationId)
		const FindStaff=await employeeModel.find({organisationId:organisationId})
		let showData={
			name:findData.organisationName,
			country:findData.country,
			state:findData.state,
			city:findData.city,
			pincode:findData.pincode,
			email:findData.email,
			numberOfEmployee:FindStaff.length,
			profileImage:findData.profileImage
	
		}
		res.status(201).send({status:true, message:showData})
} catch (error) {
	return res.status(500).send({status:false, message:error.message})
}

}

const updateOrg=async(req,res)=>{
try {
		let data=req.body
		let organisationId=req.decode.id
	    let files = req.files // Get the file to upload
	
	    if (files && files.length > 0) {
	        let uploadFileUrl = await uploadFile(files[0])
	        data.profileImage = uploadFileUrl
	    }
		if(data.email){
			const isEmailUnique= await userModel.findOne({email:data.email})
			if(isEmailUnique&&organisationId!=isEmailUnique._id)   return res.status(400).send({status:false, message:"email is already used,please use another email"})
		}
	
			await userModel.findByIdAndUpdate(organisationId,data)
	
		
		return res.status(201).send({status:true, message:"data update successfully"})
} catch (error) {
	return res.status(500).send({status:false, message:error.message})
}
}
const updatePassword=async(req,res)=>{
	try {
		let data=req.body
		let organisationId=req.decode.id
		const oldData=await userModel.findById(organisationId)
		const decodePassword = await bcrypt.compare(data.oldPassword, oldData.password)
		if(!decodePassword) return res.status(400).send({ status: false, message: "password not matched" })
	   
		let encryptPassword =await bcrypt.hash(data.password, saltRounds)
	        
		data.password=encryptPassword
		await userModel.findByIdAndUpdate(organisationId,data.password)
		return res.status(201).send({status:true, message:"password updated successfully"})
	} catch (error) {
		return res.status(500).send({status:false, message:error.message})
	}
}



module.exports = {createData,login,getUser,updateOrg,updatePassword};

