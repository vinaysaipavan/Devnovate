import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ConfigWithJWT } from "../../types";
import backendAPI from "../../api/BackendApi";
import { toast } from "sonner";
import type { RootState } from "../store";

export interface IVideo{
    _id : string,
    path : string,
    title? : string,
    description ?: string,
    uploadedBy: {
        email : string
    },
    isPrivate : boolean,
    thumbNail : string
}

export interface EditVideo{
    _id : string,
    path : string,
    title? : string,
    description ?: string,
    uploadedBy: {
        email : string
    },
    isPrivate : boolean,
    thumbNail : string
}

export interface VideoState{
    videos : IVideo[] | null;
    publicVideos : IVideo[] | null;
    searchResults : IVideo[] | null;
    isLoading : boolean;
    editVideo : IVideo | null;

}

interface FileFetchPayLoad{
    configWithJWT : ConfigWithJWT;
}

interface SingleFileResponse{
    success : boolean;
    message : string;
    video ?: IVideo
}
interface FileResponse{
    success : boolean;
    message : string;
    videos ?: IVideo[];
}

const initialState : VideoState = {
    videos : [],
    publicVideos : [],
    searchResults : [],
    isLoading : false,
    editVideo : null
}

export const fetchVideosForUser = createAsyncThunk<IVideo[],FileFetchPayLoad,{rejectValue : string}>("/video/fetch-user-videos",async (payload,thunkAPI)=>{
    try{
       const {configWithJWT} = payload;
       const {data} = await backendAPI.get<FileResponse>("/api/v1/form/fetch-user/video",configWithJWT);
       if(data.success){
         return data.videos || []
       }
 
       return thunkAPI.rejectWithValue(data.message)
    }
    catch(error : any){
        const errMessage = error.response?.data?.message || "Something went wrong"
        toast.error(errMessage)
        return thunkAPI.rejectWithValue(errMessage)
    }
 })

export const fetchVideosForPublic = createAsyncThunk<IVideo[],void,{rejectValue : string}>("/video/fetch-public-videos",async (_,thunkAPI)=>{
   try{
      const {data} = await backendAPI.get<FileResponse>("/api/v1/all-videos");
      if(data.success){
        return data.videos || []
      }

      return thunkAPI.rejectWithValue(data.message)
   }
   catch(error : any){
       const errMessage = error.response?.data?.message || "Something went wrong"
       toast.error(errMessage)
       return thunkAPI.rejectWithValue(errMessage)
   }
})

export const downloadVideo = createAsyncThunk<void,{id : string},{rejectValue : string}>("video/download",
  async(payload,thunkAPI) => {
      try{
        const {id} = payload;
        const token = localStorage.getItem("token")
        const state = thunkAPI.getState() as RootState;
        const queryParams = state.auth.loggedInUser ? `?userId=${encodeURIComponent(state.auth.loggedInUser._id)}` : ""
        const response = await backendAPI.get(`/api/v1/form/download/video/${id}${queryParams}`,{
            responseType : "blob", 
            headers: {
              Authorization: `Bearer ${token}`, 
            },
        })

        const contentDisposition = response.headers['content-disposition']
        const filename = contentDisposition
            ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
            : `video-${id}.mp4`;

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Video Downloaded Successfully")

      }
      catch(error : any){
         return thunkAPI.rejectWithValue(error)
      }
  }
)

export const deleteVideo = createAsyncThunk<
  { id: string }, // ✅ Return type
  { id: string; configWithJWT: ConfigWithJWT }, // ✅ Input type
  { rejectValue: string }
>(
  "video/delete",
  async ({ id, configWithJWT }, thunkAPI) => {
    try {
      const { data } = await backendAPI.delete<FileResponse>(
        `/api/v1/form/delete/video/${id}`,
        configWithJWT
      );

      if (data.success) {
        toast.success("Video deleted successfully");
        return { id };
      }

      return thunkAPI.rejectWithValue(data.message);
    } catch (error: any) {
      const errMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errMessage);
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const getSearchResults = createAsyncThunk<IVideo[],string,{rejectValue :  string,state : RootState}>("video/search",async(query,thunkAPI) => {
    try{
      const {publicVideos,videos} = thunkAPI.getState().video;
      const combinedVideos = [...(publicVideos || []),...(videos || [])];
      const filteredVideos = combinedVideos.filter(
        (video) => 
             video.title?.toLowerCase().includes(query.toLowerCase()) ||
             video.description?.toLowerCase().includes(query.toLowerCase()) 
    )
       return filteredVideos;
    }
    catch(error : any){
        return thunkAPI.rejectWithValue(error);
    }
})

const videoSlice = createSlice({
    name : "video",
    initialState,
    reducers : {
        setEditVideo: (state, action) => {
            console.log("Setting edit video in Redux:", action.payload);
            state.editVideo = action.payload;
            localStorage.setItem("editVideo", JSON.stringify(action.payload));
          },
          clearEditVideo: (state) => {
            state.editVideo = null;
            localStorage.removeItem("editVideo");
          }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchVideosForPublic.pending,(state) => {state.isLoading = true})
        .addCase(fetchVideosForPublic.fulfilled,(state,action)=>{
            state.publicVideos = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchVideosForPublic.rejected,(state)=>{
            state.isLoading = false;
        })
        .addCase(fetchVideosForUser.pending,(state) =>{state.isLoading = true})
        .addCase(fetchVideosForUser.fulfilled,(state,action) => {
            state.videos = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchVideosForUser.rejected,(state) => {
            state.isLoading = false;
        })
        .addCase(deleteVideo.fulfilled,(state,action)=>{
            state.videos = state.videos?.filter((video) => video._id !== action.payload.id) || null;
        })
        .addCase(getSearchResults.fulfilled,(state,action) => {
            state.searchResults = action.payload;
        })
    }
})

export const videoReducer = videoSlice.reducer;
export const {setEditVideo} = videoSlice.actions;
export const selectPublicVideos = (state : RootState) => 
    state.video.publicVideos
export const selectUserVideos = (state : RootState) =>
    state.video.videos

export const selectVideoLoading = (state : RootState) => state.video.isLoading
export const selectEditingVideo = (state : RootState) => state.video.editVideo
export const selectSearchResults = (state : RootState) =>  state.video.searchResults