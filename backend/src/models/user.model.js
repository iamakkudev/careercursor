import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    roadmap: {
        type: Schema.Types.ObjectId,
        ref: "Roadmap"
    },
    profilePic:{
            link: {
                type:String,
                default: "",
            },
            id: String,
    },
    lastlogin:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

},{timestamps:true});

export const User = mongoose.model('User', userSchema);

