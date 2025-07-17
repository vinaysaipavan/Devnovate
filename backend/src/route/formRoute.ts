import express from "express";
import { videoCreate } from "../Controller/auth/authCOntroller";
import { authenticate } from "../Middleware/auth";
import { deleteVideo, downloadVideo, fetchSingleVideo, fetchVideos, fetchVideosByUser, updateVideo } from "../files/fileController";
import { verifyVideoOwner } from "../Middleware/verifyVideoOwner";
import { verifyToken } from "../Middleware/verifyToken";

const router = express.Router();

router.post("/upload",authenticate,videoCreate)
router.get("/fetch-single/video/:id",fetchSingleVideo)
router.get("/fetch-user/video",verifyToken,fetchVideosByUser)
router.delete("/delete/video/:id",verifyToken,verifyVideoOwner,deleteVideo)
router.get("/download/video/:id",verifyToken,downloadVideo)
router.post("/update/video/:id",verifyToken,verifyVideoOwner,updateVideo)

export default router