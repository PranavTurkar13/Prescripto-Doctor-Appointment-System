import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllAppointments = () => {
  const { atoken, getAllAppointment, appointments,cancelAppointmen } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getAllAppointment()
    }
  }, [atoken])

  return (
    <div className='m-5 w-full max-w-6xl'>

      <p className='mb-4 text-lg font-semibold text-gray-700'>All Appointments</p>

      {/* Table Header - hidden on mobile */}
      <div className='bg-primary text-white rounded-t-lg hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 text-sm font-medium'>
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>

      {/* Appointments List */}
      <div className='border border-t-0 rounded-b-lg overflow-hidden'>
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-start sm:items-center py-4 px-6 gap-2 sm:gap-0 border-b last:border-b-0 hover:bg-gray-50 transition-colors text-sm text-gray-600'
            >
              {/* # */}
              <p className='font-medium text-gray-800'>
                <span className='sm:hidden text-gray-400 text-xs mr-1'>#</span>
                {index + 1}
              </p>

              {/* Patient */}
              <div className='flex items-center gap-2'>
                <img
                  src={item.userData?.image}
                  alt={item.userData?.name}
                  className='w-8 h-8 rounded-full object-cover bg-gray-200'
                />
                <p className='font-medium text-gray-700'>{item.userData?.name}</p>
              </div>

              {/* Age */}
              <p>
                <span className='sm:hidden text-gray-400 text-xs mr-1'>Age: </span>
                {item.userData?.dob
                  ? new Date().getFullYear() - new Date(item.userData.dob).getFullYear()
                  : 'N/A'}
              </p>

              {/* Date & Time */}
              <p>
                <span className='sm:hidden text-gray-400 text-xs mr-1'>Date: </span>
                {item.slotDate}, {item.slotTime}
              </p>

              {/* Doctor */}
              <div className='flex items-center gap-2'>
                <img
                  src={item.docData?.image}
                  alt={item.docData?.name}
                  className='w-8 h-8 rounded-full object-cover bg-gray-200'
                />
                <p>{item.docData?.name}</p>
              </div>

              {/* Fees */}
              <p className='font-medium text-gray-800'>
                <span className='sm:hidden text-gray-400 text-xs mr-1'>Fees: </span>
                ${item.docData?.fees}
              </p>

              {/* Actions */}
              <div>
                {item.cancelled ? (
                  <span className='text-red-500 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='text-green-500 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full'>
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='cursor-pointer hover:scale-110 transition-transform'
                    title='Cancel Appointment'
                  >
                    ❌
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='py-10 text-center text-gray-400 text-sm'>
            No appointments found.
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments