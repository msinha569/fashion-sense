import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../Context/CartPageContext'
import CartItem from '../../Components/ItemCard/CartItem'
import Header from '../../Components/Header/Header'
import { useProductContext } from '../../Context/ProductContext'

function CartPage() {
  const {cart, totalPrice} = useCartContext()
  const {dispatch} = useProductContext()

  useEffect(() => {
    let price = 0 
    cart.forEach((item) =>
      price = price + item.price * item.qty
    )
    dispatch({type: "TOTALPRICE", payload: price})
  },[cart])


  return (
    <div className='space-y-2'>
      <Header/>
      <div className='text-3xl text-center m-2 font-thin'>
        {
          cart.length===0 ?
          (
            "Your Cart is Empty"
          ) : (
            "Your Cart Items are:"
          )
        }
      </div>
      <div className='flex flex-col justify-center gap-3 items-center'>
      {
        cart.map((item) =>
        <CartItem data={item} key={item._id} />
        )
      }
      </div>
      <div className='border border-t-4'>

      </div>
      <div className='text-center'>
        <div className='text-2xl'>
          Total Price: ${totalPrice}
        </div>
        <div>
         
        </div>
      </div>
    </div>
  )
}

export default CartPage
