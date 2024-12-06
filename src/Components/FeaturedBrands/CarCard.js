import React, { useState } from 'react'
import { Link } from 'react-router-dom'




function CarCard({data, more}) {

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const rateBox = () => (
  
    <div
    className='cursor-pointer text-white text-xl p-2'>
    {data.rating}⭐
    </div>
    )

  const moreBox = () => (
    <Link to={`/ProductDetails/${data._id}`}>
    <div className='border rounded-md border-orange-300 bg-orange-300 py-1 m-1 px-2'>
      More
    </div>
    </Link>
  )

    return (
  <div
  className=" w-72 rounded-md m-5 space-y-1 p-2 bg-slate-700 hover:scale-105 transform transition-transform duration-300">
  <div
  className='text-white text-center text-xl font-bold'>
          {data.title}
        </div>
        <div
        className='text-white text-center text-sm font-thin'>
          {data.categoryName}
        </div>
        <div
        className=' w-full h-32  rounded-md'>
          <img 
          loading='lazy'
          onLoad={() => setIsImageLoaded(true)}
          className='w-full h-32  rounded-md' 
          src={data.image}/>
        </div>
      
        <div 
        className='flex justify-between'>
          <div 
          className='text-yellow-400 font-bold text-xl p-2'>
            {data.price}$
          </div>
          <div>
          {more?moreBox():rateBox()}
        </div>
        </div>
        
      
        
      </div>
    )
  }

export default CarCard
