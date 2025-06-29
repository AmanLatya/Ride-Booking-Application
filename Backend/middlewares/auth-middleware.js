const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blackListModel = require("../models/black-list-token");



module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized: No token provided"});
    }

    const isBlackListed = await blackListModel.findOne({ token });
    if(isBlackListed){
        return res.status(401).json({message: "Unauthorized: Token is blacklisted"});
    }   
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await userModel.findById(decoded._id).select("-password -__v");
        
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        req.user = user;
        return next();
    }catch(err){
        console.error("Authentication error:", err);
        return res.status(401).json({message: "Unauthorized", error: err.message});
    }
}
