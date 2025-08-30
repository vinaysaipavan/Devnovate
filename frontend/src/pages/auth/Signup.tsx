import React from 'react'
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { SignupUser } from '../../reducers/auth/authReducer';
import type {AppDispatch}  from '../../reducers/store';

const Signup : React.FC = () => {
    const [email,setEmail] = React.useState<string>('');
    const [password,setPassword] = React.useState<string>('');
    const dispatch = useDispatch <AppDispatch>();

    function onChange(event : React.ChangeEvent<HTMLInputElement>){
        // console.log(email)
        // console.log(password)
        if(event.target.name === 'email'){
            setEmail(event.target.value);
        }
        else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }

    }
    async function submitForm(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        // console.log('Form submitted with email:', email, 'and password:', password);
        
        // const response = await fetch('http://localhost:3000/api/v1/auth/sign-up', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email, password }),
        // });
        // if (response.ok) {
        //     const data = await response.json();
        //     console.log(data.message, data);
        //     setEmail("")
        //     setPassword("")
        //     // Handle successful signup (e.g., redirect to login or dashboard)
        // } else {
        //     const errorData = await response.json();
        //     console.error(errorData.message);
        //     // Handle signup failure (e.g., show error message)
        // }

       dispatch(SignupUser({email,password}))
    }
  return (
     
           <div className="min-h-[80vh] flex items-center justify-center pt-2">
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Have an account?{' '}
          <Link to="/sign-in" className="text-blue-600 hover:underline" >
            Login
          </Link>
        </p>
      </div>
    </div>
      
  )
}

export default Signup
