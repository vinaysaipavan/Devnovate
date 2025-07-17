import { RequestHandler } from "express";
import Video from "../Models/videoSchema";
import { sendResponse } from "../utils/sendResponse";
import https from "https";
import http from "http";
import { URL } from "url";
import mongoose, { ObjectId } from "mongoose";
import User from "../Models/userSchema";

export const fetchVideos : RequestHandler =  async(req,res)=>{
    try{
        const videos = await Video.find({isPrivate : false})
        .sort({
            createdAt : -1
        })
        .populate("uploadedBy","email")
    
        sendResponse(res,200,true,"Videos Fetched Successfully",{videos})
    }
    catch(error){
       console.error(`Error in fetching videos ${error}`)
       return sendResponse(res,500,false,"Internal Server Error")
    }
    
}
export const fetchVideosByUser : RequestHandler =  async(req,res)=>{
    try{
      // console.log('req.user:', req.user);
      if (!req.user || !req.user._id) {
        return sendResponse(res, 401, false, "Unauthorized");
      }
        
     
      const id = req.user._id.toString();
      if(!id){
         return sendResponse(res,500,false,"Internal Server Error");
      }

        const videos = await Video.find({uploadedBy : new mongoose.Types.ObjectId(id)})
        .sort({
            createdAt : -1
        })
        .populate("uploadedBy","email");

        const user = await User.findByIdAndUpdate(id,{uploadCount : videos.length});
        
        sendResponse(res,200,true,"Videos Fetched Successfully",{videos})

      
    }
    catch(error){
       console.error(`Error in fetching videos ${error}`)
       return sendResponse(res,500,false,"Internal Server Error")
    }
    
}


export const fetchSingleVideo : RequestHandler = async (req,res) => {
    try{
       const {id} = req.params
       if(!id){
          return sendResponse(res,500,false,"Internal Server Error");
       }

       const video = await Video.findById(id).populate("uploadedBy","email")
       if(!video){
         return sendResponse(res,500,false,"Video Not Found")
       }
       sendResponse(res,200,true,"Your Video Found",{video})
    }
    catch(error){
        console.error(`Error in fetching single video ${error}`);
        sendResponse(res,500,false,"Internal Server Error")
    }
}

export const deleteVideo : RequestHandler = async(req,res) => {
    try{
        const {id} = req.params
       if(!id){
          return sendResponse(res,500,false,"Internal Server Error");
       }

       const video = await Video.findByIdAndDelete(id)
       if(!video){
         return sendResponse(res,500,false,"Video Not Found")
       }
       sendResponse(res,200,true,"Your Video is Deleted",{video})
    }
    catch(error){
        console.error(`Error in Deleting single video ${error}`);
        sendResponse(res,500,false,"Internal Server Error")
    }
}

export const downloadVideo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return sendResponse(res, 500, false, "Internal Server Error");

    const video = await Video.findById(id);
    if (!video || !video.path) {
      return sendResponse(res, 404, false, "Video Not Found");
    }

    const videoUrl = video.path;
    const parsedUrl = new URL(videoUrl);
    const fileName = `video-${id}.mp4`;
    const client = parsedUrl.protocol === "https:" ? https : http;

    // Set headers to force download
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "video/mp4");

    // ✅ Pipe and increment download count
    client.get(videoUrl, (videoStream) => {
      videoStream.pipe(res);

      // Increment user download count *after* stream starts
      if (req.user?._id) {
        User.findByIdAndUpdate(
          req.user._id.toString(),
          { $inc: { downloadCount: 1 } },
          { new: true }
        ).catch((err) => console.error("Download count update error:", err));
      }
    }).on("error", (err) => {
      console.error("Cloudinary video stream error:", err);
      sendResponse(res, 500, false, "Failed to stream video");
    });

  } catch (error) {
    console.error("Error in Downloading video", error);
    sendResponse(res, 500, false, "Internal Server Error");
  }
};


export const updateVideo : RequestHandler = async (req,res) => {
    try{
      const {id} = req.params;
      if(!id){
        return sendResponse(res,500,false,"Internal Server Error");
      }

      const {title,description,isPrivate,thumbNail} = req.body;
      const video = await Video.findByIdAndUpdate(id ,{
        title,
        description,
        isPrivate,
        thumbNail
      },
      {new : true})

        if(!video){
            return sendResponse(res,500,false,"Video Not Found")
        }

        sendResponse(res,200,true,"Your Video is Updated Successfully",{video})
    }
    catch(error){
        console.error(`Error in Updating  video ${error}`);
        sendResponse(res,500,false,"Internal Server Error")
    }
}