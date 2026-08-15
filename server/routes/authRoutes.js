const express = require("express");
const router = express.Router();
const {signup,login} = require("../controllers/authcontrollers.js")
const {auth} = require("../middlewares/auth.js");



router.post("/signup",signup);
router.post("/login",login);

router.get("/test",auth,(req,res)=>{
    res.status(201).json({
        success:false,
        message:"protected route",
        user:req.user
    });
});

    
module.exports = router;