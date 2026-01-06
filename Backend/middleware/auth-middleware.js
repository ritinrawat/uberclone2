const mongoose = require('mongoose');
const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const blacklistTokenModel = require("../models/blacklistToken.model")
const captainModel = require("../models/captain.model")


module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorize"})
    }
    const isBlacklisted=await blacklistTokenModel.findOne({token:token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await userModel.findById(decoded._id)

        req.user=user;
        return next()
    }catch(err){
    return res.status(401).json({message:'Unauthorized'})
    }

} 
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("📌 Received Token:", token);



    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    console.log("🔍 Token Blacklisted:",isBlacklisted);

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("✅Token Decoded Successfully:");
        console.log("JWT_SECRET:",process.env.JWT_SECRET);
        // console.log("🔑 Token in Confirm Ride Request:", token);
        // Debug: Check the _id extracted from the token
        console.log("📌Extracted captain ID from token:", decoded._id);
     
        const captainId = new mongoose.Types.ObjectId(decoded._id);
const captain = await captainModel.findById(captainId);
        console.log("📌 Captain Found in DB:", captain);

        if (!captain) {
            console.log("⚠️ Captain Not Found in DB for ID:", decoded._id);
            return res.status(401).json({ message: 'Captain not found in database' });
        }

        req.captain = captain;
        return next();
    } catch (err) {
        console.error("❌ Token Verification Failed:", err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
