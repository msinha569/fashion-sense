import React from 'react'
import { useCatagoriesFilterContext } from '../../Context/CatagoriesFilterContext'
import CarCard from './CarCard'

function FeaturedBrands() {
    const {searchData} = useCatagoriesFilterContext()
    const topCars = searchData.slice(1,5)
    const featuredCars = searchData.slice(2,10)
  return (
    <div className=''>
      <div>
        <div className='text-center text-3xl font-bold'>Top Categories Cars</div>
        <div className='flex flex-wrap justify-center'>
            {topCars.map((item) =>
            <CarCard data={item} more={false} key={item._id}/>
            )}
        </div>
      </div>
      <div>
        <div className='text-center text-3xl font-bold'>Featured Cars</div>
        <div className='flex flex-wrap justify-center'>
            {featuredCars.map((item) =>
            <CarCard data={item} more={true} key={item._id}/>
            )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedBrands
