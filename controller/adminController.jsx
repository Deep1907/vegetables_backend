const express = require("express")
const productModel = require("../models/Products.jsx")
const cloudinary = require("../config/cloudinary.jsx")

const addProductController = async (req,res) =>{
    try{
        const {name,price} = req.body

        if(name === "" || price === "" || !req.file){
            return res.status(400).json({success:false,message:"Cannot be blank"})
        }

        const result = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_stream(
                {
                    folder: "vegetables"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            ).end(req.file.buffer);

        });

        await productModel.create({
            name : name,
            price : price,
            image: result.secure_url
        })

        return res.status(201).json({success:true,message:"Products Added Successfully"})

    }catch(err){
        return res.status(500).json({success:false,message:"server Error"})
    }
}

const listProductController = async (req,res) =>{
    const listedProducts = await productModel.find({})
    res.status(200).json({success:true,message:"Data fetched Successfully",listedProducts})
}

const deleteProductController = async (req,res) => {

    const {id} = req.params

    const updateProduct = await productModel.findByIdAndDelete(id)
    res.status(200).json({success:true,message:"Deleted Successfully"})

}

const updateProductController = async (req,res) =>{
    const {id} = req.params
    const {name,price} = req.body

    const updatedProducts = await productModel.findByIdAndUpdate(id,{name,price})
    res.status(200).json({success:true,message:"Updated Successfully"})

} 

module.exports = {addProductController,listProductController,deleteProductController,updateProductController};