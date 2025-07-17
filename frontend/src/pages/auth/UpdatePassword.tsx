import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import backendAPI from '../../api/BackendApi'
import { toast } from 'sonner'
import { Link } from 'react-router'
import Layout from '../../components/Layout'

interface UpdatePasswordResponse{
    success : boolean,
    message : string
}

const UpdatePassword : React.FC = () => {
    const {token} = useParams<{token : string}>()
    const [password,setPassword] = useState<string>("")
    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(false)
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
         e.preventDefault()
         try{
             const {data} = await backendAPI.post<UpdatePasswordResponse>(`/api/v1/auth/update-password/${token}`,{password})
             if(data.success){
                  toast.success(data.message)
                  navigate("/sign-in")
             }
             else{
                toast.warning(data.message)
                navigate("/sign-up")
             }
         }
         catch(error){
             toast.error("something went wtong")
         }
         finally{
              setLoading(false)
         }
    }
  return (
    <Layout>
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-10">
          <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
            Reset Your Password
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
  
  <button
  disabled={loading}
  type="submit"
  className="w-full bg-green-600 mt-2 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-green-300 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <span>Processing...</span>
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </>
  ) : (
    "Update Password"
  )}
</button>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Not a member yet?</span>{" "}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Signup for free
              </Link>
            </div>
          </form>
        </div>
      </main>
  
      {/* Footer is assumed to be in the Layout */}
    </div>
  </Layout>
  )
}

export default UpdatePassword
