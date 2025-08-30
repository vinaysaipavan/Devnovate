import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import backendAPI from '../../api/BackendApi'
import { toast } from 'sonner'

interface ResetResponse{
    success : boolean,
    message : string
}

const ResetPasswordEmail : React.FC = () => {
    const [email,setEmail] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
         try{
            e.preventDefault()
            setLoading(true)
            const {data} = await backendAPI.post<ResetResponse>("/api/v1/auth/reset-password",{email})

            if(data.success){
                toast.success(data.message)
                setEmail("")
                navigate("/sign-in")
            }
            else{
                toast.warning(data.message)
            }
         }
         catch(error){
             toast.error("something went wrong")
         }
         finally{
            setLoading(false)
         }
    }
  return (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-10">
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
          Reset Your Password
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className={`w-full mt-4 p-4 bg-green-500 text-white font-bold rounded-md shadow-md transition duration-300 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center ${
                loading ? "bg-opacity-90" : "hover:bg-opacity-90"
              }`}
              disabled={loading}
            >
              {loading ? "Processing ......" : "Reset Password"}
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

  )
}

export default ResetPasswordEmail
