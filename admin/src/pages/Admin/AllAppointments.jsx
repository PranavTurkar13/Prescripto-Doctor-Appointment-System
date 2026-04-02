import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const AllAppointments = () => {
  const {atoken,getAllAppointment,appointments} = useContext(AdminContext)
  useEffect(() => {
    if(atoken){
      getAllAppointment()
    }
  }, [atoken])
  return (
    <div>
      <p>All Appointments</p>
    </div>
  )
}

export default AllAppointments
