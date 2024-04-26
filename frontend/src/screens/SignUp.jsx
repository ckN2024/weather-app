import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const dataSent = await axios.post("http://localhost:5000/signup", formData)
      console.log(`Data sent: ${dataSent}`)
      console.log(formData)
    } catch (error) {
      console.log("Error in cognito")
    }
  }

  return (
    <div>
      <form action="">
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="text" 
          onChange={(e)=> setFormData({...formData, email: e.target.value})}
          placeholder='Enter name'
          className="border" 
        />
        <br />

        <label htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Enter password" 
          className="border"
        />
        <br />

        <button 
          className='border p-2'
          onClick={submitHandler}
        >
          Sign up
        </button>
      </form>
    </div>
  )
}

export default SignUp