import React from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'


const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

      {/* ------- Left Section ------- */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>

        <p className='text-xl md:text-3xl  lg:text-4xl font-semibold text-white leading-snug'>
          Book Appointment
        </p>

        <p className='mt-4 text-white text-sm md:text-base opacity-90'>
          Simply browse through our extensive list of trusted doctors and book your appointment hassle-free.
        </p>

        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='mt-6 px-6 py-3 bg-white text-primary 
                           rounded-full font-medium 
                           hover:scale-105 transition duration-300'>
          Create Account
        </button>
      </div>

      {/* ------- Right Section ------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img 
          className='w-full absolute bottom-0 right-0 max-w-md'
          src={assets.appointment_img} 
          alt="Appointment"
        />
      </div>

    </div>
  )
}

export default Banner