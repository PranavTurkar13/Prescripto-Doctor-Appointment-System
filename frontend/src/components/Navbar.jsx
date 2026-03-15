import React, { useState, useRef, useEffect,useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const {token,setToken,userData,setUserData} = useContext(AppContext)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const profileRef = useRef(null)

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const logOut = () =>{
    setToken(false)
    localStorage.removeItem("token")
  }
  

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/doctors', label: 'ALL DOCTORS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ]

  return (
    <div className='sticky top-0 z-50 flex items-center justify-between px-6 py-3 mx-3 mt-3 text-sm
      backdrop-blur-lg bg-white/80 border border-white/40 rounded-full shadow-md'>

      {/* Logo */}
      <img
        className='w-36 cursor-pointer'
        src={assets.logo}
        alt="logo"
        onClick={() => navigate('/')}
      />

      {/* Desktop Nav */}
      <ul className='hidden md:flex items-center gap-7 font-medium text-gray-600'>
        {navLinks.map(({ to, label }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-[3px]">
                <li className={`py-1 transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`}>
                  {label}
                </li>
                {isActive && (
                  <span className="h-[2px] w-4/5 bg-primary rounded-full block" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className='flex items-center gap-3'>
        {token && userData ? (
          <>
            {/* Profile (desktop + mobile click) */}
            <div ref={profileRef} className="relative flex items-center gap-2 cursor-pointer">
              <div
                className="flex items-center gap-2"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
                  src={userData.image}
                  alt="profile"
                />
                <img
                  className={`w-3.5 transition-transform duration-200 ${openProfile ? 'rotate-180' : ''}`}
                  src={assets.dropdown_icon}
                  alt="dropdown"
                />
              </div>

              {/* Profile Dropdown — works on both mobile & desktop */}
              {openProfile && (
                <div className="absolute right-0 top-[calc(100%+10px)] bg-white shadow-2xl rounded-2xl w-52 py-2 border border-gray-100 z-50">
                  <p
                    onClick={() => { navigate('/my-profile'); setOpenProfile(false) }}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 hover:text-primary transition cursor-pointer text-gray-700"
                  >
                    👤 My Profile
                  </p>
                  <p
                    onClick={() => { navigate('/my-appointments'); setOpenProfile(false) }}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 hover:text-primary transition cursor-pointer text-gray-700"
                  >
                    📅 My Appointments
                  </p>
                  <div className="border-t mt-1">
                    <p
                      onClick={() => { logOut(); setOpenProfile(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-500 transition cursor-pointer mt-1"
                    >
                      🚪 Log Out
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <img
              onClick={() => setShowMenu(true)}
              className="w-6 md:hidden cursor-pointer"
              src={assets.menu_icon}
              alt="menu"
            />
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white rounded-full px-5 py-2.5 font-medium hover:opacity-90 transition'
          >
            Create Account
          </button>
        )}
      </div>

      {/* ===== Mobile Sidebar ===== */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
          showMenu ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowMenu(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center bg-white justify-between p-5 border-b">
            <img className="w-28" src={assets.logo} alt="logo" />
            <button
              onClick={() => setShowMenu(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <img className="w-4" src={assets.cross_icon} alt="close" />
            </button>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col p-5 text-gray-700 font-medium gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setShowMenu(false)}
              >
                {({ isActive }) => (
                  <li className={`px-4 py-3 rounded-xl transition font-medium ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}>
                    {label}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar