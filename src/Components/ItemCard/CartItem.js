import React from 'react'
import { removeFromCart, updateQty } from '../../Services/CartServices'
import { useProductContext } from '../../Context/ProductContext'


function CartItem({data}) {
  const {dispatch} = useProductContext()
  
  console.log(data);
  

  const QtyComponent = () => {
  return (
    <div className='flex gap-1'>
      <div className=''>
            QTY
      </div>
      <div 
      onClick={() => updateQty("decrement", data._id, dispatch)}
      className='px-2  border border-solid cursor-pointer'>
            -
      </div>
      <div className='px-2'>
            {data.qty}
      </div>
      <div 
      onClick={() => updateQty("increment", data._id, dispatch)}
      className='px-3  border border-solid cursor-pointer'>
            +
      </div>
    </div>
  )
}
 

  return (
    <div className='flex p-2 border w-1/2 gap-3 h-24 items-center justify-between  border-solid border-gray-400'>
      <div className='flex gap-2 w-1/4'>
      <div className='w-28 rounded-md'>
        <img className='rounded-md h-full '
        src={data.image}/>
      </div>
      <div>
        <div className='font-bold text-lg'>
          {data.title}
        </div>
        <div className='font-bold text-yellow-500'>
          ${data.price}
        </div>
      </div>
      </div>
      <div>
        <QtyComponent/>
      </div>
      <div>
      <button 
          onClick={() => removeFromCart(data._id, dispatch)}
          className='bg-red-500 w-full  text-white p-1 rounded-md'>
            Remove from Cart
          </button>
      </div>
    </div>
  )
}

export default CartItem
