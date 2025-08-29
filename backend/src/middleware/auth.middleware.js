import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

export const isLoggedIn = async(req,res,next) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: false, message: "Unauthorized - no token provided"})
    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET);
        if(!isValid) return res.status(401).json({success: false, message: "Unauthorized - no token provided"})

        const user = await User.findById(isValid.userId).select("-password")
        
        req.user = user;

        next();
        
    } catch (error) {
        console.error("Error in verifToken ", error)
        return res.status(500).json({success:false, message:"Server error"})
    }
}