 const jwt=require("jsonwebtoken")


 const auth=async(req,res,next)=>{
    let token=req.headers["token"] 
    if(!token) return res.status(400).send({status:false,message:"token not present"})
     jwt.verify(token,"new_seceret_key",(err,decode)=>{
        if(err){
            return res.status(401).send({status:false,message:err.message})

        }else{
            req.decode=decode
            next()
        }
     })

    }
    module.exports={auth}