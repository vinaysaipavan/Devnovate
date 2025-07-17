import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { downloadVideo, type IVideo } from '../reducers/video/videoReducer';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../reducers/store';
import { toast } from 'sonner';
import backendAPI from '../api/BackendApi';
import parse from 'html-react-parser';
import { FaPlay ,FaDownload} from 'react-icons/fa6';
import ReactPlayer from 'react-player'

const SingleVideoPage : React.FC = () => {
    const {id} = useParams<{id : string}>();
    const [video,setVideo] = useState<IVideo|null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    const [isPlaying,setIsPlaying] = useState<boolean>(false)
    const [isDownloading,setIsDownloading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
         const fetchVideo = async () => {
            try{
                setLoading(true)
               const {data} = await backendAPI.get(`/api/v1/form/fetch-single/video/${id}`)
               if(data.success){
                setVideo(data.video)
               }

            }
            catch(error : any){
                toast.error(`Error fetching video: ${error.message}`);
            }
            finally{
                setLoading(false)
            }
         }

         if(id){
            fetchVideo()
         }
    },[id])

    const handleDownload = async () => {
        try{
           setIsDownloading(true);
           if(id){
               await dispatch(downloadVideo({id}))
               toast.success('video downloaded successfully')
           }
        }
        catch(error){
           toast.error(`Failed to Download Video`)
        }
        finally{
         setIsDownloading(false)
        }
     }
 if(loading) return <p className='text-lg text-center'>Loadig .........</p>
  return (
    <div className="relative w-full h-[69vh] bg-black">
  {video && (
    <>
      {/* Text + Buttons shown ONLY when video is NOT playing */}
      {!isPlaying && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent flex flex-col justify-center items-start p-8 z-10">
          <h1 className="text-3xl font-bold text-white mb-2">{video.title}</h1>
          <p className="text-sm text-gray-300 mb-4">Default description</p>

          <div className="flex space-x-4">
            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-blue-500 text-white w-16 h-16 rounded-full flex justify-center items-center hover:bg-blue-700 transition"
            >
              <FaPlay className="text-2xl" />
            </button>

            {/* Download Button */}
            <button
  onClick={handleDownload}
  className="bg-green-500 text-white w-16 h-16 rounded-full flex justify-center items-center hover:bg-green-700 transition"
>
  {isDownloading ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
      />
    </svg>
  ) : (
    <FaDownload className="text-2xl" />
  )}
</button>
          </div>
        </div>
      )}

      {/* Video Player */}
      <ReactPlayer
        src={video.path}
        controls
        width="100%"
        height="100%"
        playing={isPlaying}
        onEnded={() => setIsPlaying(false)} // auto-reset on end
        onPause={() => setIsPlaying(false)} // optional: reset on pause
        light={!isPlaying ? video.thumbNail || true : false}
        playIcon={null}
        className="absolute top-0 left-0"
      />
    </>
  )}

  <div>Uploaded By : {video?.uploadedBy.email}</div>
</div>

  
  )
}

export default SingleVideoPage
