import React from 'react'
import { MdHome } from "react-icons/md";
import { IoMdLogIn, IoMdLock } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="flex gap-[1.2em] p-2">
        <div className='flex gap-1 items-center'>
            <MdHome className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Home</p>
        </div>
        <div className='flex gap-1 items-center'>
        <IoMdLogIn className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Login</p>
        </div>
        <div className='flex gap-1 items-center'>
        <IoMdLock className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Signup</p>
        </div>
        
    </div>
  )
}

export default Navbar