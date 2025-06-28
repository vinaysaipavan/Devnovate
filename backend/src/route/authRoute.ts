import express from "express";
import {sendResetPasswordEmail, signinUser, signupUser, updatePassword} from "../Controller/auth/authCOntroller";
import userRoute from "./userRoute";
import passport from "passport";

const router = express.Router();

router.post("/sign-up", signupUser);
router.post("/sign-in",signinUser)
router.use("/user",passport.authenticate("jwt",{session : false}),userRoute)
router.post("/reset-password",sendResetPasswordEmail)
router.post("/update-password/:token",updatePassword)

export default router;
