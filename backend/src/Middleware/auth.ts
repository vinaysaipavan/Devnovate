import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/userSchema';
import dotenv from "dotenv"
dotenv.config()


export const authenticate = async (req : any, res : any, next : any) => {
    console.log("HEADERS:", req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("❌ No Bearer token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 TOKEN:", token);
  console.log("TOKEN BACKEND:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload & {id : string};
    console.log("DECODED USER:", decoded);
    const user = await User.findById(decoded.id).select("_id email name");
    if (!user){
      console.log("❌ No user found");
       return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user; // ✅ Now you can access req.user in controllers
    next();
  } catch (err) {
    console.log("❌ Token verify error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
