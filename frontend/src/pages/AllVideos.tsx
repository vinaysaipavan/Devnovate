import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../reducers/store'
import { fetchVideosForPublic, getSearchResults, selectPublicVideos, selectSearchResults, selectVideoLoading } from '../reducers/video/videoReducer'
import HeroVideoCard from '../components/HeroVideoCard'
import Loader from '../components/Loader'

const AllVideos : React.FC  = () => {
  const [query,setQuery] = useState<string>('');
  const [searchTerm,setSearchTerm] = useState<string>('');
  const searchResults = useSelector(selectSearchResults)
  const isLoading = useSelector(selectVideoLoading)
  const dispatch = useDispatch<AppDispatch>()
  const publicVideos = useSelector(selectPublicVideos)
  useEffect(() => {
      if(searchTerm){
        dispatch(getSearchResults(searchTerm));
      }
      dispatch(fetchVideosForPublic())
  },[searchTerm])

  const handleSearch = () => {
    setSearchTerm(query);
  }
  return (
    <div className='w-full p-4'>
        {isLoading ? <Loader /> : 

       <main className='w-[95vw]'>
        {/* search bar */}
        <div className='mt-3 px-3 w-full flex justify-center '>
          <input type='search' value={query} onChange={(e) => setQuery(e.target.value)}
            className='w-8/12 block rounded-full p-2 focus:outline-none border border-black focus:border-none focus:outline-blue-600 bg-bgOne'
          />
          <button onClick={handleSearch} className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-full '>
             Search
          </button>
        </div>

        <div className='mt-7'>
             {searchTerm ? 
             <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
                  {searchResults?.map((video :any,index: any) => {
                    return <HeroVideoCard key={index} video={video} />
                  })}
             </div>
              : 
             <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
                {publicVideos?.map((video : any,index : any) => {
                    return  <HeroVideoCard key={index} video={video}/>
                })}
            </div>
            
          }
        </div>
            
       </main>
        }
    </div>
  )
}

export default AllVideos
