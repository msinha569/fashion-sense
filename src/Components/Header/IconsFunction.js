import React, { useState } from 'react'
import {  FaHeart, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../Context/LoginPageContext';
import { logoutHandler } from '../../Services/AuthServices';
import { useWishContext } from '../../Context/WishlistPageContext';
import { useCartContext } from '../../Context/CartPageContext';
import { FaGithub } from "react-icons/fa6";


function IconsFunction({className}) {
  const {name, dispatch} = useLoginContext()
  const loggedIn = name!==""
  const [showLogout, setShowLogout] = useState(false)
  const navigate = useNavigate()
  const {wish} = useWishContext()
  const {cart} = useCartContext()


  const toggleLougout = () => {
    setShowLogout(!showLogout)
  }
  
  const handleLogout = () => {
    navigate('/')
    logoutHandler(dispatch)
    setShowLogout(false)
  }

  const handleAccountNavigate = () => {
    navigate('/AccountsPage')
  }

  return (

    <div className={className}>
     <div className=''>
      <a href="https://github.com/msinha569/eCommerce" target="_blank" rel="noopener noreferrer">
        <FaGithub size={35} />
      </a>
    </div>
     <div className=''>
        <Link to='/WishListPage'>
         <FaHeart size={30}/>
         <div className='rounded-full bg-red-500  absolute  px-2  mx-4 -my-8 opacity-70'>
            {wish.length}
         </div>
         </Link>
    </div>
    <div>
        <Link to='/CartPage'>
       <FaShoppingCart size={30}/>
       <div className='rounded-full bg-red-500  absolute  px-2  mx-4 -my-8 opacity-70'>
            {cart.length}
       </div>
       </Link>
    </div>
    <div>
      <div>
        <Link to ='/SignupPage'>
          <FaUserAlt 
          onClick={(e) => {
            if (loggedIn){
              e.preventDefault()
              toggleLougout()
            }}}
          className= {loggedIn?"text-green-500":""}
          size={30}/>
        </Link>
      </div>
      {showLogout && loggedIn && (
          <div 
          onMouseLeave={() => setShowLogout(false)}
          className="absolute right-0 mt-2 w-32 z-10 m-2 bg-white border border-gray-300 rounded shadow-md">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-gray-100">
              Log Out
            </button>
            <button
              onClick={handleAccountNavigate}
              className="w-full px-4 py-2 text-left hover:bg-gray-100">
              Accounts Page
            </button>
          </div>
        )}
    </div>
   
    </div>
    
    
  )
}

export default IconsFunction
