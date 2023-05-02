const express=require("express")
const { connection } = require("./db")
const { UserRouter } = require("./Routes/UserRoutes")
const { AuthMiddlware } = require("./Middlewares/AuthMiddleware")
const { PostRouter } = require("./Routes/PostRoutes")
const cors= require("cors")
const app=express()

app.use(cors())
app.use(express.json())
app.use("/users",UserRouter)
app.use(AuthMiddlware)
app.use("/post",PostRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("DB CONNECTED ON FULLSTACK APP")
    } catch (error) {
        console.log(error)
    }
    console.log(`Port running ${process.env.port}`)
})