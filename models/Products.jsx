
const mongoose = require("mongoose")

const Products = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

const productModel = mongoose.model("vegetablemodel",Products)

module.exports = productModel;