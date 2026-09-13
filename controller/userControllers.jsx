const express = require("express")
const userModel = require("../models/Users.jsx")
const jwt = require("jsonwebtoken")

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

const loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body
        const userExists = await userModel.findOne({email})
        if(!userExists){
            return res.status(400).json({success:false,message:"User Already Exists"})
        }


        if(password !== userExists.password){
            return res.status(400).json({success:false,message:"Password does not Match"})
        }

        const token = jwt.sign({userId : userExists._id}, process.env.JWT_SECRET, {expiresIn:"7d"})
        
        return res.status(200).json({success:true,message:"Login Successful",token,username : userExists.username})


    }catch(err){
        console.log(err)
    }
}



module.exports = {addUser,loginUser}