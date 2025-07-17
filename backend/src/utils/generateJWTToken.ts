import { Iuser } from "../Models/userSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateJWTToken = async (user: Iuser): Promise<string> => {
  const secretOrKey = process.env.JWT_SECRET_KEY as string;

  // ✅ Only sign minimal payload
  const jwttoken = jwt.sign(
    { id: user._id.toString() }, // include only the user ID
    secretOrKey,
    { expiresIn: "1d" }
  );

  return jwttoken;
};
