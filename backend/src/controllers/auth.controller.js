import crypto from 'crypto'
import { generateTokenAndSetCookie } from '../lib/generateTokenAndSetCookie.js';
import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import cloudinary from '../lib/cloudinary.config.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../brevo/email.js';

export const signup = async (req,res)=>{
    const {email, name, password} = req.body
    try {
         if(!email || !password || !name){
         return res.status(400).json({success:false,message: "All field are required"})
        }
        const userAlreadyExist = await User.findOne({email});
        
        if(userAlreadyExist){
            return res.status(400).json({success:false,message: "User already exist"})
        }

        const hashedPassword = await bcryptjs.hash(password,10)
        const verificationToken = Math.floor(100000 + Math.random()*900000).toString();

        const user = new User({
            name,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 4 * 60 * 60 * 1000, //4hours
        })
        await user.save()

    
        generateTokenAndSetCookie(user._id,res)


        await sendVerificationEmail(email, verificationToken)

        res.status(201).json({
            success:true,
            message:"User Created Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
        
    } catch (error) {
        console.log("Error in Signup route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const login = async (req,res)=>{
    const {email, password} = req.body
    try {
         if(!email || !password){
        throw new Error("All field are required");
        }
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({success:false,message: "User not found"})
        }
        const isPasswordValid = bcryptjs.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({success:false,message: "Invalid credentials"})
        }

      
        generateTokenAndSetCookie(user._id,res)

        user.lastlogin = Date.now();

        res.status(201).json({
            success:true,
            message:"User logged in Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
        
    } catch (error) {
        console.log("Error in loggin route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}


export const logout = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged out Successfully"
     })
}


export const checkAuth = (req,res)=>{
    try {
        const user = req.user;
        if(!user){
         return res.status(404).json({success:false,message: "User not found"})
        }

        res.status(200).json({success:true,user})
    } catch (error) {
        console.log("Error in checkauth route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const verifyEmail = async (req,res)=>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken : code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        }).select("-password");
        if(!user) return res.status(400).json({success:false,message:"Invalide or expired verification code"})

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email)


        res.status(200).json({
            success:true,
            message:"Email verified succesfully",
            user,
        })
    } catch (error) {
        console.log("Error in verify route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const forgotPassword = async (req,res)=>{
    const {email} = req.body;
    try {
        if(!email) return res.status(400).json({message:"Please Enter Your Email"})

        const user = await User.findOne({email}).select("-password");
        if(!user) return res.status(404).json({message:"User not Found"})

        //Generate reset token
        user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordExpiresAt = Date.now() + 1 *60 *60 *1000;
        
        await user.save();

        
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`)

        res.status(200).json({
            success:true,
            message:"Password Reset Email sent successfully",
            user
        })
    } catch (error) {
        console.log("Error in verify route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

//todo:check from frontend
export const resetPassword = async (req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        })
        if(!user) return res.status(400).json({success:false,message:"Invalide or expired reset token"})

        user.password = await bcryptjs.hash(password, 10)

        //delete Generated token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
            
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success:true,
            message:"Password Reset Email sent successfully",
        })
    } catch (error) {
        console.log("Error in verify route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const updateProfile = async (req,res) =>{
    try {
        const {profilePic} = req.body;
        if (!profilePic) return res.status(400).json({ message: "Please upload the pic" });

        const id = req.user._id
        const user = await User.findById(id).select("-password")
        if(!user){
         return res.status(404).json({success:false,message: "User not found"})
        }

        const prevImg = user.profilePic?.id;

        const uploadimage = await cloudinary.uploader.upload(profilePic,{folder:"careercursor"})
    
        user.profilePic = {
        link: uploadimage.secure_url,
        id: uploadimage.public_id
        };


        await user.save();

        if(prevImg) await cloudinary.uploader.destroy(prevImg)

        
        res.status(200).json({success:true, user})
    } catch (error) {
        console.log("Error in update route",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}


