import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='bg-pink-900 p-4 sm:flex block justify-center items-center '>
        <div >
        <img 
         className=' w-full h-64'
         src="car.svg"/>
        </div>
     <div className='p-4 space-y-5'>
      <div className='text-white font-bold text-3xl sm:text-5xl '>
      Before they sold out<br/>
      All Women Clothes
      </div>
      <div
      className='text-gray-300 font-thin'>
      Rent out clothes with best discount and quality
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
