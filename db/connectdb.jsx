const mongoose = require("mongoose")

const connectdb = async () =>{
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connected To Database")
}

module.exports = connectdb;


