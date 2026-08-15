const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await
        mongoose.connect(process.env.MONGO_URL);
        console.log("connect sccessfully");

    }catch(error){
        console.log("mongodb connection failed ")
        console.log(error.message);
        process.exit(1);

    }
};


module.exports = connectDB;