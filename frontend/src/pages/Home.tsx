import React,{useEffect, useState} from 'react'
import { fetchVideosForPublic, selectPublicVideos, selectVideoLoading } from '../reducers/video/videoReducer'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../reducers/store'
import { FaPlay } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import HeroVideoCard from '../components/HeroVideoCard'
import VideoSlider from '../components/VideoSlider'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'


const Home : React.FC = () => {
    const publicVideos = useSelector(selectPublicVideos)
    const isLoading = useSelector(selectVideoLoading)
    const [isPlaying,setIsPlaying] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
      dispatch(fetchVideosForPublic())
    },[publicVideos])
    
  return (
    <>
    <div className='heroSection relative w-full h-[80vh]'>
  {!isPlaying && 
    <div
      style={{ zIndex: 5 }} 
      className='absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-gray-700 flex flex-col items-center justify-center text-center px-4'
    >
      <h1 className='text-4xl font-bold capitalize mb-4 md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-yellow-800'>
        Create Your Videos and Publish
      </h1>
      <p className='text-lg mb-6 md:text-xl font-extralight text-white max-w-2xl'>
        Reach More Subscribers and Get Likes and comments on your video by just watching our basic tutorial videos.
      </p>
      <button className='bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:scale-105 transform animate-scale-pulse mb-4'>
  <FaPlay className='text-2xl' />
</button>

      <button 
        className='bg-blue-500 text-black px-6 py-3 mt-2 rounded shadow-lg hover:bg-blue-200 transition duration-300' 
        onClick={() => setIsPlaying(true)}
      >
        Watch Now
      </button>
    </div>
  }

  <div 
    className={`absolute top-0 left-0 w-full h-full ${isPlaying ? "block" : "hidden"}`} 
    style={{ zIndex: isPlaying ? 0 : 1 }}
  >
    <ReactPlayer 
      src='https://youtu.be/d7t_ui8ON9w' 
      controls 
      width='100%' 
      height='100%' 
    />
  </div>
</div>

     <main className='w-[95vw] relative px-6'>
           <h2 className='capitalize text-textTwo text-lg sm:text-2xl md:text-3xl lg:text-4xl mt-2 p-4'>
               Recently Added
           </h2>

           {!isLoading ? 
           <div className='w-full flex justify-center'>
              <Skeleton height={300} width={800}/>
           </div> : <VideoSlider videos={publicVideos}/>}
           
     </main>
    </>
  )
}

export default Home
