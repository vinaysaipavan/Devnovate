import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser } from '../reducers/auth/authReducer'
import type { AppDispatch } from '../reducers/store'
import { downloadVideo, type IVideo } from '../reducers/video/videoReducer'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa6'
import { FaDownload, FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import parse from 'html-react-parser'
import { MdAccessTime } from 'react-icons/md'

interface HeroVideoCardProps {
  video: IVideo
}

const HeroVideoCard: React.FC<HeroVideoCardProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [duration, setDuration] = useState<number>(0)

  const loggedInUser = useSelector(selectLoggedInUser)
  const dispatch = useDispatch<AppDispatch>()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (video.path) {
      const el = videoRef.current
      if (el) {
        el.onloadedmetadata = () => {
          setDuration(el.duration)
        }
      }
    }
  }, [video.path])

  const handlePlayPause = () => {
    setIsPlaying(true)
    setIsHovered(true)
  }

  const handleShare = () => {
    const videoLink = `http://localhost:5173/video/${video._id}`
    navigator.clipboard.writeText(videoLink).then(() => {
      toast.success('Link copied to clipboard')
    })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleDownload = async () => {
     try{
        setIsLoading(true);
        await dispatch(downloadVideo({id : video._id}))
     }
     catch(error){
        toast.error(`Failed to Download Video`)
     }
     finally{
      setIsLoading(false)
     }
  }

  return (
    <div
      className="heroVideoCard flex flex-col gap-2 relative bg-white rounded-md m-2 h-52"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden <video> for duration */}
      <video ref={videoRef} src={video.path} style={{ display: 'none' }} preload="metadata" />

      <div className="relative w-full h-[180px] cursor-pointer overflow-hidden">
        {/* Actual Video Player (under thumbnail until playing) */}
        <ReactPlayer
          src={video.path}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={isPlaying}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="absolute top-0 left-0 z-0"
        />

        {/* Thumbnail + Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-10">
            <img
              src={video.thumbNail}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
            {isHovered && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center transition-opacity duration-300"
                onClick={handlePlayPause}
              >
                <FaPlay
                  size={30}
                  className="text-white hover:text-gray-300 transition duration-200"
                />

                <div
                  className="absolute top-2 left-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShare()
                  }}
                >
                  <FaShareAlt
                    size={20}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  />
                </div>

                <Link to={`/video/${video._id}`} onClick={(e) => e.stopPropagation()}>
                  <FaExternalLinkAlt
                    size={20}
                    className="text-white absolute top-2 right-2 hover:text-gray-300"
                  />
                </Link>

                {isLoading ? (
                  <p className="text-white absolute bottom-2 left-2 text-sm">Downloading ...</p>
                ) : (
                  <FaDownload
                    size={20}
                    className="text-white absolute bottom-2 left-2 cursor-pointer hover:text-gray-300"
                    onClick={handleDownload}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="detailsContainer px-2">
        <h2 className="text-lg font-semibold">{video.title}</h2>
        <div className="userContainer flex justify-between items-center">
          <div className="text-gray-600 text-xs mb-1 max-w-[200px] truncate">
            {video?.description ? (
              <p>{parse(video?.description.substring(0, 100))}</p>
            ) : (
              <p>default</p>
            )}
          </div>
          {duration > 0 && (
            <div className="text-gray-500 text-xs flex items-center gap-2 pb-2">
              <MdAccessTime className="text-lg" />
              <p>{formatDuration(duration)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroVideoCard

