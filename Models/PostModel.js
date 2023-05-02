const mongoose=require("mongoose")
const PostSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    Username:String,
    UserID:String
})

const PostModel=mongoose.model("Post",PostSchema)

module.exports={PostModel}