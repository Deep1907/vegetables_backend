const express = require("express")
const userModel = require("../models/Users.jsx")

const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" })
        }

        const user = await userModel.create({ username, email, password })
        return res.status(200).json({ success: true, message: "User Added Successfully" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

module.exports = {addUser}