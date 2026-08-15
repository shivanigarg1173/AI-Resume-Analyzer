const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next) =>{
     try{
        const token = req.header("Authorization")?.replace
        ("Bearer ", "");
        if(!token){
        return res.status(401).json({
            success:false,
            message:"token missing"
        });}

        const decoded = jwt.verify(token,
            process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
      
        next();
     }
     catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"invalid token"
            
        });
     }
}