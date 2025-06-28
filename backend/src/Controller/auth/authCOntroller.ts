import { Request, RequestHandler } from "express";
import User from "../../Models/userSchema";
import { sendResponse } from "../../utils/sendResponse";
import crypto from "crypto";
import { hashPassword, matchHashedPassword } from "../../utils/passwordHelper";
import { generateJWTToken } from "../../utils/generateJWTToken";
import { resetPasswordEmail } from "../../mailer/resetPassword";

interface RegisterReq extends Request{
    body : {
        email : String;
        password : String;
    }
}

export const signupUser : RequestHandler = async (req : RegisterReq,res) => {
    try{
        const {email} = req.body
        const password = req.body.password as string;
        const existUser = await User.findOne({email})

        if(existUser){
           return sendResponse(res,400,false,"User Already exists")
        }
        const hashedNewPassword = await hashPassword(password);
        const newuser = await User.create({
            email,
            password:hashedNewPassword,
            token : crypto.randomBytes(16).toString("hex")
        })
        return sendResponse(res,201,true,"User Created Successfully")
    }
    catch(err){
     console.error("Some Error in signing Up : ",err)
     return sendResponse(res,500,false,"Internal Server Error")
    }
}

export const signinUser : RequestHandler = async (req : RegisterReq,res) => {
    try {
        const {email} = req.body
        const password = req.body.password as string;
        const user = await User.findOne({email})
        if(!user){
            return sendResponse(res,400,false,"User doesn't exists")
        }
        const result = await matchHashedPassword(password,user.password)
        if(!result){
            return sendResponse(res,400,false,"Invalid credentials")
        }
        console.log(result)
        const jwtToken = await generateJWTToken(user);
        return sendResponse(res,200,true,"User Sigin Successfull",{user : {token : jwtToken}})

    } catch (error) {
        console.error(`Error in signing In : ${error}`);
        return sendResponse(res,500,false,"Internal Server Error")
    }
}

export const sendResetPasswordEmail : RequestHandler = async (req, res) => {
     try{
         const {email} = req.body
         if(!email){
            return sendResponse(res,404,false,"Email Not Provided")
         }

         const user = await User.findOne({email})
         if(!user){
            return sendResponse(res,404,false,"User Not Provided")
         }

         await resetPasswordEmail(user)
         sendResponse(res,200,true,"Check Your mail to reset your password")
     }
     catch(error){
        console.error(`Error in sending Email : ${error}`);
        return sendResponse(res,500,false,"Internal Server Error")
     }

}

export const updatePassword : RequestHandler = async(req,res)=>{
    try{
      const {token} = req.params
      const {password} = req.body

      if(!token){
        return sendResponse(res,404,false,"TOken Not Found")
      }
      const user = await User.findOne({token})
      if(!user){
        return sendResponse(res,404,false,"User Not Found")
      }
      const hashedPassword = await hashPassword(password)
      user.password = hashedPassword
      user.token = crypto.randomBytes(16).toString("hex")
      await user.save()

      return sendResponse(res,200,true,"Updated Your Password")
    }
    catch(error){
        console.error(`Error in Updating Password : ${error}`);
        return sendResponse(res,500,false,"Internal Server Error")
    }
}
