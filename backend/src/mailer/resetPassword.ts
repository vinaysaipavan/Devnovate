import { Iuser } from "../Models/userSchema";
import dotenv from 'dotenv';
import { transporter } from "../config/nodemailer";
import ejs from "ejs"
import path from "path"
dotenv.config();

export const resetPasswordEmail = async (user : Iuser)=> {
    try{
        const emailHTML = await ejs.renderFile(path.join(__dirname,"../view/resetEmail.ejs"),{token : user.token})
       const options = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Reset Password",
        html: emailHTML
       }

       await transporter.sendMail(options)
    }
    catch(error){
        console.error(`Error in resetPasswordEmail: ${error}`);
    }
}