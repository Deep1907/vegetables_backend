const express = require("express")
const paymentController = require("../controller/paymentController.jsx")
const isAuthenticated = require("../middleware/isAuth.jsx")
const Payment = require("../models/Payment.jsx")

const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils.js")

const paymentRouter = express.Router()

paymentRouter.post("/create",isAuthenticated,paymentController)
paymentRouter.post("/webhook",async (req,res)=>{
    try{
        const webhookSignature = req.headers["x-razorpay-signature"];
        const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body),webhookSignature,process.env.WEBHOOK_SECRET)
        if(!isWebhookValid){
            return res.status(400).json({ message:"Webhook Signature is Invalid" })
        }

        const paymentDetails = req.body.payload.payment.entity

        const payment = await Payment.findOne({ orderId: paymentDetails.order_id })
        payment.status = paymentDetails.status
        await payment.save()

        if(req.body.event === "payment.captured"){

        }

        if(req.body.event === "payment.failed"){

        }

        return res.status(200).json({ message:"Webhook Received Successfully" })

    }catch(err){
        console.log(err)
    }
})

module.exports = paymentRouter;