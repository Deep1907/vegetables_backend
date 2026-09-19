const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const app = express()


const adminRouter = require("./router/adminRouter.jsx")
const connectdb = require("./db/connectdb.jsx")
const paymentRouter = require("./router/paymentRoute.js")
const userRouter = require("./router/userRouter.jsx")

app.use(cors({
    origin: "https://vegetables-frontend.vercel.app"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/admin",adminRouter)
app.use("/api/payment",paymentRouter)
app.use("/api/users",userRouter)


app.use("/",(req,res)=>{
    res.send("Server Connected Again")
})

app.listen(process.env.PORT,()=>{
    connectdb()
    console.log("Connected")
})
