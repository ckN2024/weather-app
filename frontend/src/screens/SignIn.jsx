import React from 'react'
import { useState } from 'react'
import cognitoSignIn from "../helpers/cognito/cognitoSignIn"
import axios from 'axios'

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
    <div>
      <form onSubmit={submitHandler}>
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
      </form>
    </div>
  )
}

export default SignIn