import React from 'react'
import { useState } from 'react'
import cognitoSignIn from "../helpers/cognito/cognitoSignIn"
import axios from 'axios'
import {Link} from "react-router-dom"

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const authTokens = await cognitoSignIn(formData.email, formData.password);
      console.log(`access token SignIn: ${JSON.stringify(authTokens)}`)
      console.log(authTokens.idToken)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center gap-3 w-full min-h-screen px-[6em] py-2">
      <div className="w-[40%] bg-blue-100 px-[3em] py-[1em] rounded-md">
        <h1 className="text-[2.5em] font-medium">Log In</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <div>
            <label htmlFor="email" className="block text-slate-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-slate-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="border border-slate-300 py-1 px-2 rounded-md w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <button 
            className="bg-blue-600 rounded-md p-2 text-white" 
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className='flex flex-col items-center'>
            <p className='text-slate-700'>or</p>
          <Link to="/signup" className='text-blue-500 underline'>Create Account</Link>
          </div>
      </div>

      <img src="/forms.svg" alt="form_image" className="max-h-[70vh]" />

      {/* <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="text" 
          placeholder='Enter email' 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <br />

        <label htmlFor="password"></label>
        <input 
          id="password" 
          type="password" 
          placeholder='Enter password'
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <br />

        <button 
          className='border p-2'
        >
          Sign in
        </button>
      </form> */}
    </div>
  )
}

export default SignIn