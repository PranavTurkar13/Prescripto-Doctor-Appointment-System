import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const MyAppointment = () => {
  const { token, backendurl,getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split("_");
    return dateArray[0]+" " + months[Number(dateArray[1])]+ " "+ dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
     
      const { data } = await axios.get(backendurl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async(appointmentId) =>{
    try {
      const {data} = await axios.post(backendurl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const initPay = (order) =>{
    const options = {
      key:import.meta.env.VITE_TEST_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : 'Appointment Payment',
      description : 'Appointment Payment',
      receipt : order.receipt,
      handler : async(response) =>{
        console.log(response)
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async(appointmentId) =>{
    try {
      const {data} = await axios.post(backendurl + '/api/user/razorpay-payment',{appointmentId},{headers:{token}})
      if(data.success){
        initPay(data.order)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    
  } 

 useEffect(() => {
  const fetchAppointments = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(backendurl + '/api/user/appointments', {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  fetchAppointments();
}, [token, backendurl]); // ✅ all dependencies declared

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-12 py-12">

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        My Appointments
      </h1>

      {/* Appointments List */}
      <div className="space-y-6">

        {appointments.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center md:items-start"
          >

            {/* Doctor Image */}
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="w-32 h-32 object-cover rounded-2xl shadow"
            />

            {/* Doctor Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </h2>

              <p className="text-gray-600">
                {item.docData.speciality}
              </p>

              <div className="text-gray-500 text-sm">
                <p className="font-medium text-gray-700">Address:</p>
                <p>{item.docData.address?.line1}</p>
                <p>{item.docData.address?.line2}</p>
              </div>

              
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-medium">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Buttons */}
            <div onClick={()=>appointmentRazorpay(item._id)} className="flex flex-col gap-3 w-full md:w-auto">
              {!item.cancelled && <button className="px-6 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition">
                Pay Here
              </button>}

              {!item.cancelled && <button onClick={()=>{cancelAppointment(item._id)}} className="px-6 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition">
                Cancel Appointment
              </button>}
              {item.cancelled && <button className="sm:min-w-48 border-red-500 rounded py-2 text-red-500">Appointment Cancelled</button>}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default MyAppointment;