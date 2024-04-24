import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className='relative'>
        <input 
            type="search" 
            placeholder='Type city'
            className="p-2 rounded-lg border border-slate-300 focus:border-slate-500 focus:outline-none"
        />
        <button className="hover:bg-blue-500 p-[0.2em] absolute right-[0.24em] top-[0.24em] rounded-lg">
            <FiSearch className="text-[1.7em] hover:text-white text-blue-500" />
        </button>
    </div>
  )
}

export default SearchBar