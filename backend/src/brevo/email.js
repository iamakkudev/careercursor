import brevo from '@getbrevo/brevo';
import {emailApi,sender} from "./brevo.config.js"



export const sendVerificationEmail = async(email, verificationToken) =>{
    try {
        const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        // emailData.subject = "";
        emailData.templateId = 3;
        emailData.params = {
                code: verificationToken,
            }
        
        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification email `,error?.response?.body || error)
        throw new Error(`Error sending verification email ${error}`)
    }
 }

 export const sendWelcomeEmail = async(email, username) =>{
    try{
        const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:username }]
        emailData.subject = "Welcome Email";
        emailData.templateId = 6;
        emailData.params = {
                username,
                company_name: "Career Cursor"
            }

        
        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification email ${error}`)
        throw new Error(`Error sending verification email ${error}`)
    }
 }

 export const sendPasswordResetEmail = async (email, resetURL) =>{
    try {
        const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.subject = "Reset your password";
        emailData.templateId = 4;
        emailData.params = {
                reset_link : resetURL,
            }

        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending password reset email ${error}`)
        throw new Error(`Error sending password reset email ${error}`)
    }
 }

 export const sendResetSuccessEmail = async (email) =>{
    try {
       const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.subject = "New password created";
        emailData.templateId = 5;


        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending reset success email ${error}`)
        throw new Error(`Error sending reset success email ${error}`)
    }
 }

 export const sendCongratulationEmail = async (email,username) =>{
    try {
       const emailData = new brevo.SendSmtpEmail();
        emailData.sender = sender;
        emailData.to = [{ email, name:"User" }]
        emailData.templateId = 7;
        emailData.params = {
                username,
            }

        const response = await emailApi.sendTransacEmail(emailData)

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending reset success email ${error}`)
        throw new Error(`Error sending reset success email ${error}`)
    }
 }