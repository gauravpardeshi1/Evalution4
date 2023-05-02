const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../Models/UserModel")
const UserRouter=express.Router()

UserRouter.post("/register",(req,res)=>{
    const{name,email,gender,password} =req.body
try {
    bcrypt.hash(password,5,async(err,hash)=>{
  const User=await UserModel({name,email,password:hash,gender})
  await User.save() 
  res.status(200).send({"msg":"User Registered"})
    })
} catch (error) {
    console.log(error)
}
})
UserRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
      const User= await UserModel.findOne({email})

      if(User){
         bcrypt.compare(password,User.password,(err,result)=>{
            if(result){
                const token=jwt.sign({Username:User.name,UserID:User._id}, 'masai');
                res.status(200).send({"msg":"Login Successful","token":token})
            }else{
                res.status(400).send({"msg":"Wrong Credentials"})
            }
         })
      }else{
        res.status(400).send("Login Failed")
      }
    } catch (error) {
        console.log(error)
    }
})

module.exports={UserRouter}