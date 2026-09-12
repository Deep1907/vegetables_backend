const express = require("express")
const userModel = require("../models/Users.jsx")

const addUser = async (req,res) =>{
    try{
        const {username,email,password} = req.body
        const userExists = await userModel.find(email)
        if(userExists){
            res.status(400).json({success:false,message:"User Already Exists"})
        }
        const user = await userModel.create({username,email,password})
        res.status(200).json({success:true,message:"User Added Successfully"})

    }catch(err){
        console.log(err)
    }
}

module.exports = {addUser}