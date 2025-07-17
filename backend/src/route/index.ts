import express from "express";
import authRoute from "./authRoute"; 
import uploadRoute from "./upload";
import formRoute from "./formRoute";
import passport from "passport";
import { fetchVideos } from "../files/fileController";

const router = express.Router();

router.use("/auth", authRoute); 
router.use("/media",uploadRoute)
router.use("/form",formRoute)
router.get("/all-videos",fetchVideos)

export default router;
