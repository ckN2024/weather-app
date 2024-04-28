import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SignUp = ({setEmail}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigate   = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const dataSent = await axios.post("http://localhost:5000/signup", formData)
      setEmail(formData.email)
      console.log(`Data sent: ${dataSent}`)
      console.log(formData)
      navigate("/verify");
    } catch (error) {
      console.log("Error in cognito")
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
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
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="Enter password" 
          className="border"
        />
        <br />

        <button 
          className='border p-2'
        >
          Sign up
        </button>
      </form>
    </div>
  )
}

export default SignUp