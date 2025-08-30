// MainProfile.tsx
import { CgProfile } from "react-icons/cg";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, updatedUser } from '../reducers/auth/authReducer';
import { toast } from 'sonner';
import backendAPI from '../api/BackendApi';
import { useConfig } from '../customHooks/useConfigHook';

const MainProfile: React.FC = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const { configWithJWT } = useConfig();

  const [edit, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (loggedInUser?.name) setName(loggedInUser.name);
    if (loggedInUser?.email) setEmail(loggedInUser.email);
  }, [loggedInUser]);

  const handleEditClick = () => setEdit(!edit);

  const handleSaveClick = async () => {
    try {
      const { data } = await backendAPI.post<Response>(
        "/api/v1/auth/user/update",
        { name, email },
        configWithJWT
      );
      if (data) {
        console.log("Success")
        dispatch(updatedUser({ name, email }));
      } 
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
    setEdit(false);
  };

  return (
    <div className="flex-grow min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Header with profile picture */}
        <div className="flex items-center p-6 bg-indigo-600 text-white">
          <div className="w-20 h-20 rounded-full border-2 border-white mr-6 bg-gray-200 flex items-center justify-center text-gray-500 text-5xl">
            <CgProfile />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{loggedInUser?.name || "User Name"}</h1>
            <p className="text-indigo-200">{loggedInUser?.email || "email@example.com"}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!edit}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!edit}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              {edit && (
                <button
                  onClick={() => setEdit(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={edit ? handleSaveClick : handleEditClick}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  edit ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        {/* Optional: Additional sections like Activity, Settings */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-gray-600 text-sm">Manage your account preferences, security settings, and notifications here.</p>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
















// // Main.tsx
// import React, { useEffect, useState } from 'react';
// import {useDispatch, useSelector} from "react-redux"
// import { selectLoggedInUser, updatedUser } from '../reducers/auth/authReducer';
// import { toast } from 'sonner';
// import backendAPI from '../api/BackendApi';
// import { useConfig } from '../customHooks/useConfigHook';

// const MainProfile = () => {
//     const loggedInUser = useSelector(selectLoggedInUser)
//     const [edit,setEdit] = useState<boolean>(false)
//     const [name,setName] = useState<string>("")
//     const [email,setEmail] = useState<string>("")

//     const dispatch = useDispatch()
//     const {configWithJWT} = useConfig()

//     useEffect(() => {
//        if(loggedInUser?.name){
//         setName(loggedInUser.name)
//        }
//        if(loggedInUser?.email){
//         setEmail(loggedInUser.email)
//        }
//     },[loggedInUser])

//     function handleEditClick(){
//         setEdit(!edit)
//     }

//     async function handleSaveClick(){
//        try{
//          const {data} = await backendAPI.post<AuthResponse>("/api/v1/auth/user/update",{name,email},configWithJWT)
//         if(data.success){
//           toast.success(data.message)
//           dispatch(updatedUser({name,email}))
//         }
//         else{
//           toast.warning(data.message)
//         }
//        }
//        catch(error){
//           toast.error("Something went wrong")
//           console.error(error)
//        }

//        setEdit(!edit)
//     }
//   return (
//     <div className="flex-grow p-10 bg-gray-100 min-h-screen">
//       <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
//         <h2 className="text-xl font-semibold mb-6 text-center">Personal Details</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-600">Name</label>
//             <input
//              type="text"
//              value={name}
//              onChange={(e) => setName(e.target.value)}
//              disabled={!edit}
//              className="w-full px-4 py-2 border rounded bg-gray-100 disabled:cursor-not-allowed"
//            />

//           </div>
//           <div>
//             <label className="block text-gray-600">Email</label>
//             <input
//              type="email"
//              value={email}
//              onChange={(e) => setEmail(e.target.value)}
//              disabled={!edit}
//              className="w-full px-4 py-2 border rounded bg-gray-100 disabled:cursor-not-allowed"
//            />

//           </div>
//           <div className="text-right">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => edit ? handleSaveClick() : handleEditClick()}>
//               {edit ? "Save" : "Edit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainProfile;