const express = require("express")
const paymentController = require("../controller/paymentController.jsx")
const isAuthenticated = require("../middleware/isAuth.jsx")
const Payment = require("../models/Payment.jsx")

const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils.js")

const paymentRouter = express.Router()

paymentRouter.post("/create",isAuthenticated,paymentController)

paymentRouter.post("/webhook", async (req, res) => {
    try {

        console.log("WEBHOOK RECEIVED");

        const webhookSignature =
            req.headers["x-razorpay-signature"];

        const rawBody = req.body.toString();

        const isWebhookValid = validateWebhookSignature(
            rawBody,
            webhookSignature,
            process.env.WEBHOOK_SECRET
        );

        if (!isWebhookValid) {
            console.log("INVALID WEBHOOK SIGNATURE");

            return res.status(400).json({
                message: "Webhook Signature is Invalid"
            });
        }

        const body = JSON.parse(rawBody);

        console.log("WEBHOOK EVENT:", body.event);

        const paymentDetails =
            body.payload.payment.entity;

        console.log("PAYMENT DETAILS:", paymentDetails);

        const payment = await Payment.findOne({
            orderId: paymentDetails.order_id
        });

        if (!payment) {
            console.log(
                "Payment not found:",
                paymentDetails.order_id
            );

            return res.status(404).json({
                message: "Payment not found"
            });
        }

        payment.status = paymentDetails.status;

        await payment.save();

        console.log("STATUS UPDATED:", payment.status);

        return res.status(200).json({
            message: "Webhook Received Successfully"
        });

    } catch (err) {

        console.log("WEBHOOK ERROR:", err);

        return res.status(500).json({
            message: "Webhook failed",
            error: err.message
        });
    }
});

module.exports = paymentRouter;