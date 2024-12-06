
import React, { Link, useState } from '../../Utils/CustomUtils'
import { FaGripLines} from "react-icons/fa";
import {ImCross} from "react-icons/im"
import Sidebar from './Sidebar';
import IconsFunction from './IconsFunction';
import { useEffect, useRef } from 'react';
import { useFilterContext } from '../../Context/FilterContext';


const  Header = () => {
  const {dispatch} = useFilterContext()
  const[isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)){
        setIsOpen(false)
      }
    }
    
    
    document.addEventListener('mousedown',handleClickOutside)
    return() => {
      document.removeEventListener('mousedown',handleClickOutside)
    }
    },[sidebarRef])

  const handleSidebar = () => {
    setIsOpen(!isOpen)
  }


  return (
    <div 
    className='sm:h-24 h-16  bg-zinc-700 flex justify-between p-3 w-full'>
      <div 
      className='flex  h-full items-center  gap-2'>
        <div 
        className='font-mono text-white'>
          <Link to ="/">
          <span 
          className='hidden sm:block '>
            E-Commerce
          </span>
          <span 
          className='block sm:hidden'>
            E-C
          </span>
          </Link>
        </div>
        <div>
          <input onChange={(e) => dispatch({type:"SEARCHBAR", payload: e.target.value})}
          className='bg-slate-500 rounded-md p-2 w-full max-w-72 min-w-20' 
          placeholder='Search..'/>
        </div>
      </div>
      <div 
      className=' gap-5 items-center hidden sm:flex'>
        <IconsFunction className='flex gap-14  items-center '/>
      </div>
      <div 
      className='flex sm:hidden items-center z-10'
      onClick={() => handleSidebar()}>
        {isOpen?
        <ImCross className='mx-4' size={30}/>
        :<FaGripLines size={30}/>}
      </div>
      <div 
      ref = {sidebarRef}
      className={`fixed top-0 right-0  h-full bg-zinc-700 p-6 transition-transform transform ${
      isOpen ? '-translate-x-0' : 'translate-x-full' }  sm:hidden`}>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Header
