import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorList from './pages/Admin/DoctorList';
import Dashboard from './pages/Admin/Dashboard';

const App = () => {
  const {atoken} = useContext(AdminContext)
  return atoken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className='flex-1'>
          <Routes>
            <Route path='/' element={<></>} />
            <Route path='/add-doctor' element={<AddDoctor/>} />
            <Route path='/all-appointments' element={<AllAppointments/>} />
            <Route path='/doctor-list' element={<DoctorList/>} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  ):(
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
