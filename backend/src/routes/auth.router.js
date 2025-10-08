import express from 'express';
import { login, logout, signup,checkAuth, verifyEmail, forgotPassword, resetPassword, updateProfile } from "../controllers/auth.controller.js";
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { limiter } from '../middleware/expressRateLimit.js';
const router = express.Router()

//todo:update authentication with gmail /facebook
router.post("/signup",limiter(5),signup)
router.post("/login",limiter(5),login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password",limiter(3),forgotPassword)
router.post("/reset-password/:token", resetPassword)
router.post("/update-profile",express.json({limit: "500kb"}),isLoggedIn ,updateProfile)
router.post("/check-auth",isLoggedIn, checkAuth)


export default router;