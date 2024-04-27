import React from 'react'
import { MdHome } from "react-icons/md";
import { IoMdLogIn, IoMdLock } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex gap-[1.2em] p-2">
        {/* Home */}
        <Link to="/"  className='flex gap-1 items-center'>
            <MdHome className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Home</p>
        </Link>

        {/* Login */}
        <Link to="/signin" className='flex gap-1 items-center'>
        <IoMdLogIn className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Login</p>
        </Link>

        {/* Signup */}
        <Link to="/signup" className='flex gap-1 items-center'>
        <IoMdLock className="text-[1.5em]"/>
            <p className='text-xl text-slate-700 hover:text-slate-900 hover:underline'>Signup</p>
        </Link>
        
    </div>
  )
}

export default Navbar