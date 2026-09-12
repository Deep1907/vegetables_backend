const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : {
        type : text,
        required : true
    },
    email : {
        type : text,
        required : true
    },
    password : {
        type : text,
        required : true
    }
})

const userModel = mongoose.model(users,"UserSchema")

module.exports = userModel;