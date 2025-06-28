// Sidebar.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Home, Video, Upload, User, LogOut } from 'lucide-react';
import type { AppDispatch } from '../reducers/store';
import { fetchUserDetails, logOutUser } from '../reducers/auth/authReducer';
import { useNavigate } from 'react-router';

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
          <Home size={20} />
          <span>Home</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
          <Video size={20} />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
          <Upload size={20} />
          <span>Upload Video</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-700 hover:text-black cursor-pointer">
          <Video size={20} />
          <span>My Videos</span>
        </li>
        <li className="flex items-center space-x-2 text-yellow-500 font-semibold cursor-pointer">
          <User size={20} />
          <span>User profile</span>
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