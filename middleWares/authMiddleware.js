
import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

//protected route token base
export const requireSignIn = async (req,res,next)=>{
try{
const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
//decryt
req.user = decode;
next();

}
catch(error){
 console.log(error)
}

}

//admin access
export const isAdmin = async (req,res,next)=>{

try{
    // check user is admin or not
const user =  await userModel.findById(req.user._id)
if(user.role !== 1){
    return res.status(401).send({
        sucsess:false,
        message:"UnAuthorized Access"
    })

}else{
    next()
}

}
catch(error){
  console.log(error);
  res.status(500).send({
    success:false,
    error,
    message:'Error inadmin middleware',
   
  })
}
}