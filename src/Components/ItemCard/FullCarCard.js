  import React, { useMemo } from 'react'
  import { addToCart, removeFromCart } from '../../Services/CartServices'
  import { useCartContext } from '../../Context/CartPageContext'
  import { useWishContext } from '../../Context/WishlistPageContext'
  import { useProductContext } from '../../Context/ProductContext'
  import { addToWishlist, deleteWishlist } from '../../Services/WishlistServices'
  import { Link } from 'react-router-dom'

  function FullCarCard({data}) {
    const {cart} = useCartContext()
    const {wish} = useWishContext()
    const {dispatch} = useProductContext()

    const isInCart = useMemo(() =>
      cart.some((prod) => prod._id === data._id), 
      [cart, data._id]
    );
    
    const isInWish = useMemo(() =>
      wish.some((prod) => prod._id === data._id), 
      [wish, data._id]
    );
    
    
    return (
      <div
      className=' w-60 rounded-md m-5 space-y-1 p-2 h-fit  bg-slate-700 hover:scale-105 transform transition-transform duration-300'>
        <div 
        className=' w-full h-36  rounded-md'>
          <Link to={`/ProductDetails/${data._id}`}>        
          <img 
          className='w-full h-32  rounded-md' 
          src={data.image}/>
          </Link>
        </div>
        <div className='text-white text-lg font-bold'>
          {data.title}
        </div>
        <div 
        className={`${data.inStock?'bg-lime-200':'bg-red-200'} w-fit px-1 text-sm rounded-3xl`}>
          {data.inStock?'in stock':'out of stock'}
        </div>
        <div 
        className='flex justify-between'>
          <div 
          className='text-white font-bold text-xl'>
            {data.price}$
          </div>
          <div 
          className='text-white text-xl'>
            {data.rating}⭐
          </div>
        </div>
        <div 
        className='flex flex-col  w-full items-center space-y-1'>
        { !isInCart ?
          (<button 
          onClick={() => addToCart(data, dispatch)}
          className='bg-cyan-500 w-full  text-white py-1 rounded-md'>
            Add to Cart
          </button>
          ) : ( 
          <button 
          onClick={() => removeFromCart(data._id, dispatch)}
          className='bg-red-500 w-full  text-white py-1 rounded-md'>
            Remove from Cart
          </button>
          )}
          { !isInWish ?
          (<button
          onClick={() => addToWishlist(data, dispatch)} 
          className='bg-slate-300 w-full  py-1 rounded-md'>
            Add to Wishlist
          </button>
          ) : (
          <button
          onClick={() => deleteWishlist(data._id, dispatch)} 
          className='bg-red-500 w-full  py-1 rounded-md text-white'>
            Remove from Wishlist
          </button>
          )}
        </div>
        
      </div>
    )
  }

  export default FullCarCard
