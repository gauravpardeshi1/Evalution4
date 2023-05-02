const express=require('express')
const { PostModel } = require('../Models/PostModel')
const PostRouter=express.Router()



PostRouter.post("/create",async(req,res)=>{
try {
    const Post= new PostModel(req.body)
    await Post.save()
    res.status(200).send({"msg":"Post Created"})
} catch (error) {
    res.status(400).send({"msg":"Eroor"})
}
})


PostRouter.get("/",async(req,res)=>{
    try {
        const Post =await PostModel.find({UserID:req.body.UserID})
        res.send(Post)
    } catch (error) {
        res.status(400).send("Error")
    }
})

PostRouter.patch("/update/:PostID",async(req,res)=>{
    const {PostID}=req.params 
    const Post=await PostModel.findOne({_id:PostID})
    try {
        if(req.body.UserID!=Post.UserID){
res.status(400).send({"msg":"You are not Authorized"})
        }else{
    await PostModel.findByIdAndUpdate({_id:PostID},req.body)
    res.status(400).send({"msg":"Post Updated"})
        }
    } catch (error) {
        res.status(400).send("Error")
    }
})

PostRouter.delete("/delete/:PostID",async(req,res)=>{
    const {PostID}=req.params 
    const Post=await PostModel.findOne({_id:PostID})
    try {
        if(req.body.UserID!=Post.UserID){
res.status(400).send({"msg":"You are not Authorized"})
        }else{
    await PostModel.findByIdAndDelete({_id:PostID})
    res.status(400).send({"msg":"Post Deleted"})
        }
    } catch (error) {
        res.status(400).send("Error")
    }
})

module.exports={PostRouter}