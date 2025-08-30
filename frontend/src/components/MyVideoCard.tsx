import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaDownload, FaExternalLinkAlt, FaShareAlt, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { MdAccessTime } from 'react-icons/md';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { deleteVideo, downloadVideo, setEditVideo, type IVideo } from '../reducers/video/videoReducer';
import type { AppDispatch } from '../reducers/store';
import { useConfig } from '../customHooks/useConfigHook';

interface HeroVideoCardProps {
  video: IVideo;
}

const MyVideoCard: React.FC<HeroVideoCardProps> = ({ video}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const {configWithJWT} = useConfig();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (video.path) {
      const el = videoRef.current;
      if (el) {
        el.onloadedmetadata = () => {
          setDuration(el.duration);
        };
      }
    }
  }, [video.path]);

  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)

const togglePlayPause = () => {
    if (!hasPlayedOnce) {
      setIsPlaying(true)
      setHasPlayedOnce(true)
    } else {
      setIsPlaying(prev => !prev)
    }
  }

  const handleClick = (e : any) => {
    // Prevent toggle if clicking inside controls
    const clickedElement = e.target as HTMLElement
    if (clickedElement.closest('.react-player')) return

    togglePlayPause()
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      await dispatch(downloadVideo({ id: video._id }));
    } catch {
      toast.error('Download failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${video._id}`).then(() => {
      toast.success('Link copied to clipboard');
    });
  };

  const handleDelete = async () => {
    try{
       await dispatch(deleteVideo({id : video._id, configWithJWT}));
    }
    catch(error){
        toast.error('Delete failed');
    }
  }
  const handleEdit = () => {
    try {
      console.log("Editing video", video);
      dispatch(setEditVideo(video));
      navigate("/update-video");
    } catch (error) {
      console.error("Error setting edit video:", error);
      toast.error("Failed to prepare video for editing");
    }
  }
  return (
    <div
      className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
         {/* Hidden <video> for duration */}
         <video ref={videoRef} src={video.path} style={{ display: 'none' }} preload="metadata" />
       {/* Left Side - Video or Thumbnail */}
       <div
        className="relative w-full md:w-1/3 h-48 md:h-auto cursor-pointer"
        onClick={handleClick}
      >
        {!hasPlayedOnce ? (
          <>
            <img
              src={video.thumbNail}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex justify-center items-center">
              <FaPlay size={30} className="text-white" />
            </div>
          </>
        ) : (
           

          <ReactPlayer
            ref={videoRef}
            src={video.path}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="100%"
            className="react-player absolute top-0 left-0"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            
          />
        )}

        {/* Hover Icons */}
        {isHovered && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div
              className="absolute top-2 left-2 pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              <FaShareAlt className="text-blue-500 hover:text-blue-700" />
            </div>
            <Link
              to={`/video/${video._id}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 pointer-events-auto"
            >
              <FaExternalLinkAlt className="text-white hover:text-gray-300" />
            </Link>
            <div
              className="absolute bottom-2 left-2 pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation()
                handleDownload()
              }}
            >
              <FaDownload className="text-white hover:text-gray-300" />
            </div>
          </div>
        )}
      </div>

      {/* Right - Info & Actions */}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{video.title}</h2>
          <p className="text-sm text-gray-600">
            {video.description ? parse(video.description.substring(0, 100)) : 'No description'}
          </p>
          <p className="text-xs text-black-500 italic">{video.uploadedBy?.email}</p>
          {duration > 0 && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MdAccessTime className="mr-1" />
              {formatDuration(duration)}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            className="flex items-center gap-1 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
          >
            <Link to={`/video/${video._id}`} className='flex flex-row space-x-1'>
            
            <FaEye size={20} />
            Preview
            </Link>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
          >
            <FaTrash size={14} />
            Delete
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
          >
            <FaEdit size={14} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyVideoCard;


