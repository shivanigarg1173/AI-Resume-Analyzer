const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 exports.signup = async(req,res)=>{
    const{name,email,password} = req.body;
    

// validation
if(!name || !email || !password){
    return
    res.status(400).json({
        message:"all fields are required"
    });
}
// check
const existuser = await
User.findOne({email:email});

if(existuser){
    return
    res.status(400).json({message:"user already exists"});
}

// hassing password
const hashedpassword = await
bcrypt.hash(password,10);

// save user
const user = await User.create({
    name,
    email,
    password:hashedpassword
});

return res.status(201).json({
    message:"user registered successfully",User
});
};

// module.exports = {
//     signup
// };

// login 

 exports.login = async(req,res)=>{
    try{

    const {email,password} = req.body;
    console.log(req.body);


    // validation
    if(!email || !password){
        return res.status(400).json({
            message:"all fields are required"});
    };

    // check
    const user = await
    User.findOne({email});
    console.log("User =",user);

    if(!user){
        console.log("user not found");
        return res.status(400).json({
            message:"user not found"});
            

    };
     
    console.log(user);
    console.log(user.password);

    const isMatch = await
    bcrypt.compare(password,
        user.password);

    if(!isMatch){
        return res.status(400).json({
            message:"invalid credentials"});
    };
    const token = jwt.sign(
    {
        id:user._id,
        email: user.email,
        
    },
    
   process.env.JWT_SECRET,
    
    {
         expiresIn:"7d"
    
    }
);
   
    return res.status(200).json({
        message:"login successful",token});
    } catch(error){
     console.log(error);
     return
     res.status(500).json({message:"internal server error",});

    }


};




