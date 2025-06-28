import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import type {AppDispatch}  from '../../reducers/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, signInUser } from '../../reducers/auth/authReducer';

const Signin : React.FC = () => {
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const dispatch = useDispatch <AppDispatch>();
    const navigate = useNavigate()
    const loading = useSelector(selectLoading)

    function onChange(event :  React.ChangeEvent<HTMLInputElement>){
        if(event.target.name === 'email'){
            setEmail(event.target.value);
        }
        else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }

    }
    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const resultAction = await dispatch(signInUser({ email, password ,navigate}));
        if (signInUser.fulfilled.match(resultAction)) {
          setEmail("");
          setPassword("");
          navigate("/profile"); // ✅ navigate after dispatch succeeds
        }
      } catch (err) {
        console.error("Sign-in error:", err);
      }
    }
    
    return (
        <Layout>
             <div className="min-h-screen flex items-center justify-center pt-2">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Join Us Today</h2>
  
          <form className="space-y-4" onSubmit={submitForm}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
                name='email'
                onChange={onChange}
                value={email}
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                name='password'
                required
                onChange={onChange}
                value={password}
              />
            </div>

            <div className='text-sm font-medium text-blue-700'> 
                <Link to={"/forgot"}>Forgot your password ?</Link>
            </div>
  
            <button
  disabled={loading}
  type="submit"
  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-green-300 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <span>Verifying...</span>
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </>
  ) : (
    "Sign in"
  )}
</button>
          </form>
  
          <p className="text-center text-sm text-gray-600 mt-4">
           Dont Have an account?{' '}
            <Link to="/sign-up" className="text-blue-600 hover:underline" >
              Signup
            </Link>
          </p>
        </div>
      </div>
        </Layout>
    )
}

export default Signin
