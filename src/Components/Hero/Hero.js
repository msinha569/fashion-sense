import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='bg-slate-700 p-4 sm:flex block justify-center items-center '>
        <div >
        <img 
         className=' w-full h-64'
         src="car.svg"/>
        </div>
     <div className='p-4 space-y-5'>
      <div className='text-white font-bold text-3xl sm:text-5xl '>
      Before they sold out<br/>
      All Super Cars
      </div>
      <div
      className='text-gray-300 font-thin'>
      Try the new edge technology at a cheap cost, selling the cars at the best possible price in the market.
      </div>
      <Link to='/ProductListingPage'>
      <button
      className='bg-red-700 rounded-md p-3 font-serif text-white'>
        Explore
      </button>
      </Link>
      </div>
    </div>
  )
}

export default Hero
