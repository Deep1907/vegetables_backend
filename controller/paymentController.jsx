const express = require("express")
const razorpayInstance = require("../utils/razorpay.js")

const Payment = require("../models/Payment.jsx")

const paymentController = async (req, res) => {
    try {

        const {totAmt} = req.body

        const amount = Math.round(Number(totAmt) * 100);

        console.log("AMOUNT IN PAISE:", amount);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Invalid amount",
            });
        }

        const order = await razorpayInstance.orders.create({
            amount: amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                username: req.user.username,
                email: req.user.email
            }
        });

        console.log("Order:", order);

        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes
        });

        const savedPayment = await payment.save();

        res.json(savedPayment);

    } catch (err) {
        console.log("PAYMENT ERROR:", err);

        res.status(500).json({
            message: "Payment creation failed",
            error: err.message
        });
    }
};

module.exports = paymentController;