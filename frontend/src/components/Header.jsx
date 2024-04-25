import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className="w-full shadow-md flex items-center gap-[1.2em] justify-between px-[6em] py-2">
        <SearchBar />
        <div className='flex flex-col items-center'>
            <img 
                src="/weather-app.svg" 
                alt="icon"
                className='w-[5em]' 
            />
            <h1 className="text-[2em] font-bold">Real Weather</h1>
        </div>
        <Navbar />
        
    </div>
  )
}

export default Header