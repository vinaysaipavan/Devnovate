import dotenv from "dotenv"
import passport from "passport"
import { Strategy as JWTStratergy,ExtractJwt, StrategyOptions } from "passport-jwt"
import User from "../Models/userSchema"
import { Request, RequestHandler } from "express"
import { Types } from "mongoose"
dotenv.config()


export interface authenticatedRequest extends Request{
   user : {
    _id : Types.ObjectId
   }
}

export type AuthenticatedRequestHandler = RequestHandler<
any,
any,
any,
any,
authenticatedRequest
>
const opts : StrategyOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECREt_KEY as string,


}

passport.use(new JWTStratergy(opts,async(jwtpayload,done)=> {
    try{
        const user = await User.findById(jwtpayload._id).select("-password")
        if(!user){
            return done(null,false)
        }
        return done(null,user)
    }
    catch(err){
        console.error(`Error in passport JWT Strategy: ${err}`);
        return done(err)
    }
}))

export default passport