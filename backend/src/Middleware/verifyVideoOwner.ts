import { RequestHandler } from "express";
import Video from "../Models/videoSchema";
import { sendResponse } from "../utils/sendResponse";

export const verifyVideoOwner: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.user)
    const userId = req.user?._id; // ensure `req.user` is set by auth middleware
    if (!userId) {
        return sendResponse(res, 401, false, "Unauthorized");
      }

    if (!id) return sendResponse(res, 400, false, "Video ID is required");

    const video = await Video.findById(id);
    if (!video) return sendResponse(res, 404, false, "Video not found");

    if (!video.uploadedBy || video.uploadedBy.toString() !== userId.toString()) {
      return sendResponse(res, 403, false, "Access denied: Not the video owner");
    }

    next();
  } catch (error) {
    console.error("Ownership verification error:", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};
