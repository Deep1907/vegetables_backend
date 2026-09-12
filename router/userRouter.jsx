const express = require("express")
const addUser = require("../controller/userControllers.jsx")

const userRouter = express.Router()

userRouter.post("/signup",addUser)

module.exports = userRouter;