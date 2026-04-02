import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "./AdminContext";

const AdminContextProvider = (props) =>{
    const [atoken, setAtoken] = useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):'')
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const getAllDoctors = async() =>{
        try {
            const {data} = await axios.post(backendurl + '/api/admin/all-doctors' ,{},{headers:{atoken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability = async(docId) =>{
        try {
            const {data} = await axios.post(backendurl + '/api/admin/change-availability',{docId},{headers:{atoken}})
            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getAllAppointment = async()=>{
        try {
            const {data} = await axios.post(backendurl + '/api/admin/get-appointment');
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        atoken,setAtoken,backendurl,doctors,getAllDoctors,changeAvailability,appointments,setAppointments,getAllAppointment
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider