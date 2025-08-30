// Sidebar.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Home, Video, Upload, User, LogOut } from 'lucide-react';
import type { AppDispatch } from '../reducers/store';
import { fetchUserDetails, logOutUser } from '../reducers/auth/authReducer';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(()=> {
       dispatch(fetchUserDetails())
    },[])
  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold mb-6">My Video Hub</h1>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
          <Link to={"/"} style={{display:"flex"}}><Home size={20}  style={{marginRight:"0.5rem"}}/><span>Home</span>
          </Link>
        </li>
        <li className={`flex flex-row items-center space-x-2 ${location.pathname == "/dashboard" ? "text-yellow-500" : "text-gray-700"} hover:text-black cursor-pointer`}>
        <Link to={"/dashboard"} style={{display:"flex"}}>
          <Video size={20} style={{marginRight:"0.5rem"}}/>
          <span>Dashboard</span>
          </Link>
        </li>
        
       
        <li className={`flex flex-row items-center space-x-2 ${location.pathname == "/upload" ? "text-yellow-500" : "text-gray-700"} hover:text-black cursor-pointer`}>
        <Link to={'/upload'}>
          <div className='flex flex-row space-x-1'>
          <Upload size={20}/>
          <span>Upload Video</span>
          </div>
          </Link>
        </li>
        

        <li className={`flex flex-row items-center space-x-2 ${location.pathname == "/my-videos" ? "text-yellow-500" : "text-gray-700"} hover:text-black cursor-pointer`}>
        <Link to={'/my-videos'} className='flex flex-row space-x-1'>
          <Video size={20} />
          <span>My Videos</span>
          </Link>
        </li>
        <li className={`flex items-center space-x-2 ${location.pathname == "/profile" ? "text-yellow-500" : "text-gray-700"} hover:text-black  cursor-pointer`}>
        <Link to={'/profile'} className='flex flex-row space-x-1'>
          <User size={20} />
          <span>User profile</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer" onClick={() => dispatch(logOutUser(navigate))}>
          <LogOut size={20} />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;