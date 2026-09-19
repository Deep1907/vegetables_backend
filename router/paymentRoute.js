const express = require("express")
const paymentController = require("../controller/paymentController.jsx")
const isAuthenticated = require("../middleware/isAuth.jsx")

const paymentRouter = express.Router()

paymentRouter.post("/create",isAuthenticated,paymentController)

module.exports = paymentRouter;