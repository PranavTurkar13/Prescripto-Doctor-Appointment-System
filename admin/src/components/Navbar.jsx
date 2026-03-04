import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'

// --- MOCK for preview ---
// const assets = { admin_logo: null }
// const AdminContext = React.createContext({ atoken: true })
// ------------------------

const Navbar = () => {
  const { atoken,setAtoken } = useContext(AdminContext)
  const role = atoken ? 'Admin' : 'Doctor'
  const logout = () =>{
    atoken && setAtoken('')
    atoken && localStorage.removeItemItem("atoken");
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-white border-b border-gray-100 shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Logo — untouched, just positioned */}
        <img src={assets.admin_logo} alt="Logo" className="h-10 w-auto object-contain" />

        {/* Divider */}
        <div className="hidden sm:block w-px h-7 bg-gray-200 mx-1" />

        {/* Role Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
          atoken
            ? 'bg-indigo-50 text-indigo-700'
            : 'bg-emerald-50 text-emerald-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            atoken ? 'bg-indigo-500' : 'bg-emerald-500'
          }`} />
          {role}
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={() => {/* handle logout */}}
        className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-150 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-none"
      >
        <svg className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span onClick={logout} className="hidden sm:inline">Logout</span>
      </button>

    </nav>
  )
}

export default Navbar