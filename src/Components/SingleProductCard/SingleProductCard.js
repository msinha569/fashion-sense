import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchForProduct } from '../../Context/SearchForProduct'
import { useCartContext } from '../../Context/CartPageContext'
import { useWishContext } from '../../Context/WishlistPageContext'
import { useProductContext } from '../../Context/ProductContext'
import { addToCart, removeFromCart } from '../../Services/CartServices'
import { addToWishlist, deleteWishlist } from '../../Services/WishlistServices'



function SingleProductCard() {

    const{ id: id} = useParams()
    const {productId, singleProduct, dispatch} = useSearchForProduct()
    const {cart} = useCartContext()
    const {wish} = useWishContext()
    const {dispatch: Dispatch} = useProductContext()

    const isInCart = useMemo(() =>
      cart.some((prod) => prod._id === singleProduct._id), 
      [cart, singleProduct._id]
    );
    console.log(cart);
    
    const isInWish = useMemo(() =>
      wish.some((prod) => prod._id === singleProduct._id), 
      [wish, singleProduct._id]
    );

    useEffect(() => {   
        dispatch({type: "SET_PRODUCT_ID", payload: id})
    }, [])

    if(!productId)
        return <div>Loading..</div>
 
  return (
    <div className='m-2 sm:flex w-full  gap-2'>
        <div className='sm:w-1/2 '>
            <img className='rounded-md h-screen w-full object-cover '
            src={singleProduct.image}/>
        </div>
        <div className='sm:w-1/2 sm:p-24 p-4 space-y-2'>
            <div className='font-bold font-serif text-4xl'>
                {singleProduct.title}
            </div>
            <div>
                {singleProduct.rating} stars
            </div>
            <div>
                {singleProduct.description}
            </div>
            <div className='bg-sky-900 w-fit p-1 rounded-xl text-white'>
                {singleProduct.inStock?'in stock':'out of stock'}
            </div>
            <div className='flex justify-between'>
                <div className='font-bold text-lg'>
                    {singleProduct.price}rs
                    </div>
                <div className='flex gap-2'>
                <div className='flex'>
                    
                   { !isInCart ?
                    (<button 
                    onClick={() => addToCart(singleProduct, Dispatch)}
                    className='bg-cyan-500 w-full  text-white p-1 rounded-md'>
                      Add to Cart
                    </button>
                    ) : ( 
                    <button 
                    onClick={() => removeFromCart(productId, Dispatch)}
                    className='bg-red-500 w-full  text-white p-1 rounded-md'>
                      Remove from Cart
                    </button>
                    )}
                </div>
                <div>
                    {
                    !isInWish ?
                    ( <div 
                    onClick={() => addToWishlist(singleProduct, Dispatch)}
                    className='bg-slate-300 p-1 rounded-lg px-2 cursor-pointer'>
                        🤍
                    </div>
                    ) : (
                    <div 
                    onClick={() => deleteWishlist(productId, Dispatch)}
                    className='bg-slate-500 p-1 rounded-lg px-2 cursor-pointer'>
                        💔
                    </div>
                    )
                    }
                </div>
                </div>   
            </div>
            </div>
        </div>
    
  )
}

export default SingleProductCard
