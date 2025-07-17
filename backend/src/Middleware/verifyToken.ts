import jwt from "jsonwebtoken";
import User from "../Models/userSchema";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

// Extend Request type to allow req.user
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: Types.ObjectId;
    };
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return; // prevent continuing
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const user = await User.findById((decoded as any).id);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = { _id: new Types.ObjectId(user._id.toString()) };
    next(); // pass control to next middleware
  } catch (err) {
    console.error("verifyToken error:", err);
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
};
