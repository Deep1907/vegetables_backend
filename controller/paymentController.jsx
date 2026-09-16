const express = require("express")
const razorpayInstance = require("../utils/razorpay.js")

const paymentController = async (req,res) =>{
    try{

        const order = await razorpayInstance.orders.create({
            "amount":50000,
            "currency":"INR",
            "receipt":"receipt#1",
            "notes":{
                username : req.user.username,
                email : req.user.email
            }
        })

        console.log("Order",order)

        res.json({order})

    }catch(err){
        console.log(err)
    }
}

module.exports = paymentController;