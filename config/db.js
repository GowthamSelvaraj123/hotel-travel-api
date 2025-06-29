const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async() => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log("Monog DB Connected");
    }
    catch(err)
    {
        console.error("Error connecting to Mongo DB", err) 
    }
}

module.exports = connectDB;