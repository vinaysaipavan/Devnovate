import { Iuser } from "../Models/userSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateJWTToken = async (user : Iuser) : Promise<string> => {
    const secretOrKey = process.env.JWT_SECRET_KEY as string; 
    const jwttoken = await jwt.sign(user.toJSON(),secretOrKey,{
        expiresIn: "1d",
    })

    return jwttoken;
}