import React from 'react'
import { useWishContext } from '../../Context/WishlistPageContext'
import FullCarCard from '../../Components/ItemCard/FullCarCard'
import Header from '../../Components/Header/Header';

function WishListPage() {
  const {wish} = useWishContext()
   
  return (
    <>
    <Header />
    
    <div className="flex flex-col items-center">
      {wish.length === 0 ? (
        <div className="text-3xl font-thin text-center m-4">
          No Items in Your Wish List
        </div>
      ) : (
        <>
          <div className="text-3xl font-thin text-center m-4">
            Items in your Wish List
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wish.map((data) => (
              <FullCarCard data={data} key={data._id} />
            ))}
          </div>
        </>
      )}
    </div>
  </>  
  )
}

export default WishListPage
