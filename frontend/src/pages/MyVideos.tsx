import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../reducers/store'
import { fetchVideosForUser ,selectUserVideos, selectVideoLoading} from '../reducers/video/videoReducer'
import HeroVideoCard from '../components/HeroVideoCard'
import { useConfig } from '../customHooks/useConfigHook'
import MyVideoCard from '../components/MyVideoCard'
import Loader from '../components/Loader'

const MyVideos : React.FC  = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userVideos = useSelector(selectUserVideos);
  const isLoading = useSelector(selectVideoLoading)
  const {configWithJWT} = useConfig()
  useEffect(() => {
      dispatch(fetchVideosForUser({configWithJWT : configWithJWT}));
  },[userVideos])
  return (
    <div className='w-full p-4'>
      {!isLoading ? <Loader /> : 
       <main className='w-full max-w-screen-xl mx-auto'>
            <section className='p-4 mt-3 '>
               <div className='grid gap-3 grid-cols-1 md:grid-cols-2'>
                  {userVideos?.map((video) => {
                    return <MyVideoCard key={video._id} video={video} />
                  })}
               </div>
            </section>
       </main>
     }
    </div>
  )
}

export default MyVideos
