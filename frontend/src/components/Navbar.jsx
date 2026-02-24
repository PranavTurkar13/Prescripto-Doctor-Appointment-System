import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)
  return (
    <div className='sticky top-0 z-50 flex items-center justify-between px-8 py-2 m-2 text-sm 
backdrop-blur-lg bg-white/30 border-b rounded-full border-white/20 shadow-sm'>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-center gap-6 font-medium'>
        
        <NavLink to="/">
        {({ isActive }) => (
            <div className="flex flex-col items-center">
            <li className="py-1">HOME</li>
            {isActive && (
                <hr className="m-auto h-[2px] bg-primary border-0 w-3/5" />
            )}
            </div>
        )}
        </NavLink>
        <NavLink to="/doctors">
        {({ isActive }) => (
            <div className="flex flex-col items-center">
            <li className="py-1">ALL DOCTORS</li>
            {isActive && (
                <hr className="m-auto h-[2px] bg-primary border-0 w-3/5" />
            )}
            </div>
        )}
        </NavLink>
        <NavLink to="/about">
        {({ isActive }) => (
            <div className="flex flex-col items-center">
            <li className="py-1">ABOUT</li>
            {isActive && (
                <hr className="m-auto h-[2px] bg-primary border-0 w-3/5" />
            )}
            </div>
        )}
        </NavLink>
        <NavLink to="/contact">
        {({ isActive }) => (
            <div className="flex flex-col items-center">
            <li className="py-1">CONTACT</li>
            {isActive && (
                <hr className="m-auto h-[2px] bg-primary border-0 w-3/5" />
            )}
            </div>
        )}
        </NavLink>
      </ul>
      <div className='flex items-center gap-2'>
        {token
        ? 
            <div className='flex items-center gap-4 group relative z-20 py-2'>
                <img className='w-12 rounded-full' src={assets.profile_pic} alt="" />
                <img className='w-4' src={assets.dropdown_icon} alt="" />
                <div className='absolute right-0 top-full mt-2 hidden group-hover:block bg-white/30 backdrop-blur-md border border-white/20 text-gray-800 shadow-lg rounded-lg w-44 text-gray-200 py-2 border border-gray-100'>
                    <div className=' flex flex-col gap-3 px-4 py-2 font-medium'>
                        <p onClick={()=>{navigate('my-profile')}} className='hover:text-primary cursor-pointer'>My Profile</p>
                        <p onClick={()=>{navigate('my-appointments')}}  className='hover:text-primary cursor-pointer'>My Appointments</p>
                        <p onClick={()=>{setToken(false)}} className='hover:text-primary cursor-pointer'>Log Out</p>
                    </div>
                </div>
            </div>
        
        : <button onClick={()=>{navigate('/login')}} className='bg-primary text-white rounded-full px-5 py-3'>Create Account</button>}
        
      </div>
    </div>
  )
}

export default Navbar
