const express = require("express")
const paymentController = require("../controller/paymentController.jsx")

const paymentRouter = express.Router()

paymentRouter.post("/create",paymentController)

module.exports = paymentRouter;