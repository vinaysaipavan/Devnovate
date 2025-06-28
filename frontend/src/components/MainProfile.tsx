// Main.tsx
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { selectLoggedInUser, updatedUser } from '../reducers/auth/authReducer';
import { toast } from 'sonner';
import backendAPI from '../api/BackendApi';
import { useConfig } from '../customHooks/useConfigHook';

const MainProfile = () => {
    const loggedInUser = useSelector(selectLoggedInUser)
    const [edit,setEdit] = useState<boolean>(false)
    const [name,setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")

    const dispatch = useDispatch()
    const {configWithJWT} = useConfig()

    useEffect(() => {
       if(loggedInUser?.name){
        setName(loggedInUser.name)
       }
       if(loggedInUser?.email){
        setEmail(loggedInUser.email)
       }
    },[loggedInUser])

    function handleEditClick(){
        setEdit(!edit)
    }

    async function handleSaveClick(){
       try{
         const {data} = await backendAPI.post<AuthResponse>("/api/v1/auth/user/update",{name,email},configWithJWT)
        if(data.success){
          toast.success(data.message)
          dispatch(updatedUser({name,email}))
        }
        else{
          toast.warning(data.message)
        }
       }
       catch(error){
          toast.error("Something went wrong")
          console.error(error)
       }

       setEdit(!edit)
    }
  return (
    <div className="flex-grow p-10 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Personal Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             disabled={!edit}
             className="w-full px-4 py-2 border rounded bg-gray-100 disabled:cursor-not-allowed"
           />

          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             disabled={!edit}
             className="w-full px-4 py-2 border rounded bg-gray-100 disabled:cursor-not-allowed"
           />

          </div>
          <div className="text-right">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => edit ? handleSaveClick() : handleEditClick()}>
              {edit ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;