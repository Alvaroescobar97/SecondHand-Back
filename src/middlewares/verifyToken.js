var jwt = require('jsonwebtoken');
var constants = require('../constants');
const User = require('../models/User');

exports.verifyToken = async(req,res,next)=>{

    try {
        const token = req.headers["x-access-token"];
        if(!token){
            return res.status(403).json({message:"No token provided"});
        }

        const decoded = jwt.verify(token, constants.secretKey);
        req.userId = decoded.id;
        
        const user = await User.findById(req.userId, {password: 0});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        next();
    } catch (error) {
        return res.status(500).json({message:"Unauthorized"});
    }

}