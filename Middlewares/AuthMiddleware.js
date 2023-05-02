const jwt=require("jsonwebtoken")

const AuthMiddlware=(req,res,next)=>{
  const token= req.headers.authorization
  if(token){
    try {
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.Username=decoded.Username 
            req.body.UserID=decoded.UserID
            next()
        }else{
            res.status(400).send({"msg":"Please Login"})
        }
    } catch (error) {
        console.log(error)
    }
  }else{
    res.status(400).send({"msg":"Please Login"})
  }
}

module.exports={AuthMiddlware}