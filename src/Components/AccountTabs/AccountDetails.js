import React from 'react'
import { useCartContext } from '../../Context/CartPageContext'
import { useWishContext } from '../../Context/WishlistPageContext'
import { useLoginContext } from '../../Context/LoginPageContext'
import { logoutHandler } from '../../Services/AuthServices'
import { useNavigate } from 'react-router-dom'

function AccountDetails() {
    const {cart} = useCartContext()
    const {wish} = useWishContext()
    const {email, name, dispatch} = useLoginContext()
    const navigate = useNavigate()

    const logoutHandle = () => {
        logoutHandler(dispatch)
        navigate('/')
    }
    const details = {
        NAME: name,
        EMAIL: email,
        WISHLIST: wish.length,
        CART: cart.length,
        LOGOUT:  <button
        className='rounded-md w-full bg-red-400 font-thin p-2 text-black hover:bg-red-500'
        onClick={logoutHandle}>LOGOUT</button>
    }

    return (
        <table className="border border-collapse border-gray-400 w-1/2 text-left space-y-4 ">
            <thead>
                <tr>
                    <th className='p-3 px-5'>FIELD</th>
                    <th  className='p-3 px-5'>VALUE</th>
                </tr>
            </thead>

            <tbody className=''>
                {Object.entries(details).map(([field,value]) => (
                    <tr>
                        <th className='p-3 px-5'>{field}</th>
                        <th className='p-3 px-5'>{value}</th>
                    </tr>
                ))}
            </tbody>
        </table>
  )
}

export default AccountDetails
