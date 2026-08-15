const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const resumeRoutes = require("./routes/resumeRoutes.js");

const app = express();
connectDB();

// const PORT = 5000;
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.use("/uploads",
    express.static("uploads")
);

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/resume",resumeRoutes);
// app.use("api/auth",authRoutes)

// home route
app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"AI resume analyzer backend is running.."

    });
    
});
// start server
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});