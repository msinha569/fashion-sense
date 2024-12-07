import React from 'react'
import Header from '../../Components/Header/Header'
import SingleProductCard from '../../Components/SingleProductCard/SingleProductCard'

function SingleProductPage() {
  return (
    <div>
      <div>
      <Header/>
      </div>
      <div className='flex justify-center'>
        <SingleProductCard/>
      </div>
    </div>
  )
}

export default SingleProductPage
