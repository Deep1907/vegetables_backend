const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()


const adminRouter = require("./router/adminRouter.jsx")
const connectdb = require("./db/connectdb.jsx")
const paymentRouter = require("./router/paymentRoute.js")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/admin",adminRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/users",userRouter)


app.use("/",(req,res)=>{
    res.send("Server Connected")
})

app.listen(process.env.PORT,()=>{
    connectdb()
    console.log("Connected")
})
