import User from "../../Models/userSchema";
import { AuthenticatedRequestHandler, authenticatedRequest } from "../../config/passportJWTStratergy";
import { sendResponse } from "../../utils/sendResponse";
import { Types } from "mongoose";

export const getUserDetails : AuthenticatedRequestHandler = async (req,res)=>{
    try{
      
      const userId = (req.user as { _id: Types.ObjectId })._id;

        if(!userId){
            return sendResponse(res,400,false,"Please signin to continue")
        }

        const user = await User.findById(userId).select("-password")
        if(!user){
            return sendResponse(res,400,false,"User not found")
        }

         sendResponse(res,200,true,"User details fetched successfully",{user})
      
    }
    catch(error){
        console.error(`Error in sending user details : ${error}`)
        sendResponse(res,500,false,"Internal Server Error")
    }

}

export const updateUser : AuthenticatedRequestHandler = async (req,res) => {
    try{
      const {name,email} = req.body
      if(!name){
        return sendResponse(res,400,false,"Please provide name")
      }
      if(!email){
        return sendResponse(res,400,false,"Please provide Email")
      }

      
      const userId = (req.user as { _id: Types.ObjectId })._id;

        if(!userId){
            return sendResponse(res,400,false,"User Id not found Please signin to continue")
        }
        const user = await User.findByIdAndUpdate(userId,{name,email})
        if(!user){
            return sendResponse(res,400,false,"User not found Please Signup")
        }
         sendResponse(res,200,true,"SuccessFully Updated Your Details",{name,email});
      
    }
    catch(error){
        console.error(`Error in updating user details : ${error}`)
        sendResponse(res,500,false,"Internal Server Error");
    }
}