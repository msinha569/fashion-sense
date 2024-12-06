import React from 'react'
import Header from '../../Components/Header/Header'
import Hero from '../../Components/Hero/Hero'
import FeaturedBrands from '../../Components/FeaturedBrands/FeaturedBrands'

function HomePage() {
  return (
    <div className='flex flex-col  '>
      <div className='sticky top-0 z-10'>
         <Header/>
      </div>
      <div className=''>
         <Hero/>
         <FeaturedBrands/>
      </div>
      
    </div>
  )
}

export default HomePage
