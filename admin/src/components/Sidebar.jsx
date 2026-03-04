import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {atoken} = useContext(AdminContext)
  return (
    <div className="min-h-screen w-56 bg-white border-r border-gray-100 shadow-sm flex flex-col pt-6 px-3">
      {atoken && 
      <ul className="flex flex-col gap-1">
        <NavLink to={'/admin-dashboard'} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
            <img src={assets.home_icon} alt="" className="w-5 h-5 object-contain opacity-70" />
            <p>Dashboard</p>
        </NavLink>
        <NavLink to={'/all-appointments'} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
            <img src={assets.appointment_icon} alt="" className="w-5 h-5 object-contain opacity-70" />
            <p>Appointments</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
            <img src={assets.add_icon} alt="" className="w-5 h-5 object-contain opacity-70" />
            <p>Add Doctor</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
            <img src={assets.people_icon} alt="" className="w-5 h-5 object-contain opacity-70" />
            <p>Doctors List</p>
        </NavLink>
        </ul>}
    </div>
  )
}

export default Sidebar