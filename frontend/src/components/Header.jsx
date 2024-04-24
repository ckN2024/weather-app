import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className="w-full shadow-md flex gap-[1.2em] justify-between p-2">
        <div className=''>Searchbar</div>
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